FROM ubuntu:18.04 AS base

ENV DEBIAN_FRONTEND=noninteractive

# Create a user with sudo rights
RUN apt-get update && apt-get -y install sudo
RUN useradd -m sdr && echo "sdr:sdr" | chpasswd \
   && adduser sdr sudo \
   && usermod -a -G audio,dialout,plugdev sdr\
   && sudo usermod --shell /bin/bash sdr
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER sdr

# Configure tzdata manually before anything else
ENV TZONE=America/Los_Angeles
RUN sudo ln -fs /usr/share/zoneinfo/$TZONE /etc/localtime \
    && sudo apt-get update && sudo apt-get -y install tzdata

# Install base build packages dependencies - step 1
RUN sudo apt-get -y install  --no-install-recommends \
    autoconf \
    automake \
    bison \
    build-essential \
    cmake \
    ffmpeg \
    flex \
    g++ \
    git \
    iproute2 \
    iputils-ping \
    libasound2-dev \
    libavahi-client-dev \
    libavcodec-dev \
    libavformat-dev \
    libboost-all-dev \
    libfftw3-dev \
    libopencv-dev \
    libopus-dev \
    libpython2.7 libpython2.7-dev \
    libpython3-dev \
    libpython3.6-dev \
    libqt5multimedia5-plugins \
    libqt5opengl5-dev \
    librdmacm1 \
    libsamplerate0-dev \
    libspeexdsp-dev \
    libtool \
    libusb-1.0-0-dev \
    libusb-dev \
    libxml2-dev \
    net-tools \
    nmap \
    pkg-config \
    pulseaudio \
    python-cheetah \
    python-flask\
    python-requests \
    qt5-default \
    qtbase5-dev \
    qtchooser \
    qtmultimedia5-dev \
    qttools5-dev \
    qttools5-dev-tools \
    traceroute \
    xxd

# This is the first step to allow sharing pulseaudio with the host
COPY pulse-client.conf /etc/pulse/client.conf

# Prepare buiid and install environment
RUN sudo mkdir /opt/build /opt/install \
    && sudo chown sdr:sdr /opt/build /opt/install

WORKDIR /opt/build

# CM256cc
FROM base AS cm256cc
ARG nb_cores=8
RUN git clone https://github.com/f4exb/cm256cc.git \
    && cd cm256cc \
    && git reset --hard 64beaaa \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/cm256cc .. \
    && make -j${nb_cores} install

# MBElib
FROM base AS mbelib
ARG nb_cores
RUN git clone https://github.com/szechyjs/mbelib.git \
    && cd mbelib \
    && git reset --hard e2d84c1 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/mbelib .. \
    && make -j${nb_cores} install

# SerialDV
FROM base AS serialdv
ARG nb_cores
RUN git clone https://github.com/f4exb/serialDV.git \
    && cd serialDV \
    && git reset --hard c58676a \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/serialdv .. \
    && make -j${nb_cores} install

# DSDcc
FROM base AS dsdcc
ARG nb_cores
COPY --from=mbelib --chown=sdr /opt/install /opt/install
COPY --from=serialdv --chown=sdr /opt/install /opt/install
RUN git clone https://github.com/f4exb/dsdcc.git \
    && cd dsdcc \
    && git reset --hard 2a89df4 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/dsdcc -DUSE_MBELIB=ON -DLIBMBE_INCLUDE_DIR=/opt/install/mbelib/include -DLIBMBE_LIBRARY=/opt/install/mbelib/lib/libmbe.so -DLIBSERIALDV_INCLUDE_DIR=/opt/install/serialdv/include/serialdv -DLIBSERIALDV_LIBRARY=/opt/install/serialdv/lib/libserialdv.so .. \
    && make -j${nb_cores} install

# Codec2
FROM base AS codec2
ARG nb_cores
RUN sudo apt-get update && sudo apt-get -y install subversion
RUN svn co https://svn.code.sf.net/p/freetel/code/codec2-dev@4067 codec2-dev \
    && cd codec2-dev \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/codec2 .. \
    && make -j${nb_cores} install

# SDRplay special
FROM base AS sdrplay
ENV SDRPLAY_MAJ 2.13
ENV SDRPLAY_MIN .1
RUN mkdir /home/sdr/sdrplay \
    && mkdir -p /opt/install/libsdrplay/include \
    && mkdir -p /opt/install/libsdrplay/lib
RUN sudo apt-get install -y wget
WORKDIR /home/sdr/sdrplay
RUN wget https://www.sdrplay.com/software/SDRplay_RSP_API-Linux-${SDRPLAY_MAJ}${SDRPLAY_MIN}.run \
    && export ARCH=`arch` \
    && sh ./SDRplay_RSP_API-Linux-${SDRPLAY_MAJ}${SDRPLAY_MIN}.run --tar xvf \
    && cp ${ARCH}/libmirsdrapi-rsp.so.${SDRPLAY_MAJ} /opt/install/libsdrplay/lib/. \
    && chmod 644 /opt/install/libsdrplay/lib/libmirsdrapi-rsp.so.${SDRPLAY_MAJ} \
    && ln -s /opt/install/libsdrplay/lib/libmirsdrapi-rsp.so.${SDRPLAY_MAJ} /opt/install/libsdrplay/lib/libmirsdrapi-rsp.so.2 \
    && ln -s /opt/install/libsdrplay/lib/libmirsdrapi-rsp.so.2 /opt/install/libsdrplay/lib/libmirsdrapi-rsp.so \
    && cp mirsdrapi-rsp.h /opt/install/libsdrplay/include/. \
    && chmod 644 /opt/install/libsdrplay/include/mirsdrapi-rsp.h

WORKDIR /opt/build

# Airspy
FROM base AS airspy
ARG nb_cores
RUN git clone https://github.com/airspy/host.git libairspy \
    && cd libairspy \
    && git reset --hard 5c86e53 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libairspy .. \
    && make -j${nb_cores} install

# RTL-SDR
FROM base AS rtlsdr
ARG nb_cores
RUN git clone https://github.com/librtlsdr/librtlsdr.git \
    && cd librtlsdr \
    && git reset --hard c7d970a \
    && mkdir build; cd build \
    && cmake -Wno-dev -DDETACH_KERNEL_DRIVER=ON -DCMAKE_INSTALL_PREFIX=/opt/install/librtlsdr .. \
    && make -j${nb_cores} install

# PlutoSDR
FROM base AS plutosdr
ARG nb_cores
RUN git clone https://github.com/analogdevicesinc/libiio.git \
    && cd libiio \
    && git reset --hard 5bdc242 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libiio -DINSTALL_UDEV_RULE=OFF .. \
    && make -j${nb_cores} install

# BladeRF
FROM base AS bladerf
ARG nb_cores
RUN git clone https://github.com/Nuand/bladeRF.git \
    && cd bladeRF/host \
    && git reset --hard 32058c4 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libbladeRF -DINSTALL_UDEV_RULES=OFF .. \
    && make -j${nb_cores} install

# HackRF
FROM base AS hackrf
ARG nb_cores
RUN git clone https://github.com/mossmann/hackrf.git \
    && cd hackrf/host \
    && git reset --hard 9bbbbbf \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libhackrf -DINSTALL_UDEV_RULES=OFF .. \
    && make -j${nb_cores} install

# LimeSDR
FROM base AS limesdr
ARG nb_cores
RUN git clone https://github.com/myriadrf/LimeSuite.git \
    && cd LimeSuite \
    && git reset --hard 025ffa1a \
    && mkdir builddir; cd builddir \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/LimeSuite .. \
    && make -j${nb_cores} install

# Airspy HF
FROM base AS airspyhf
ARG nb_cores=8
RUN git clone https://github.com/airspy/airspyhf \
    && cd airspyhf \
    && git reset --hard 075b8f9 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libairspyhf .. \
    && make -j${nb_cores} install

# Perseus
FROM base AS perseus
ARG nb_cores
RUN git clone https://github.com/f4exb/libperseus-sdr.git \
    && cd libperseus-sdr \
    && git checkout fixes \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libperseus .. \
    && make \
    && make install

# XTRX
FROM base AS xtrx
ARG nb_cores
RUN git clone https://github.com/xtrx-sdr/images.git xtrx-images \
    && cd xtrx-images \
    && git reset --hard 053ec82 \
    && git submodule init \
    && git submodule update \
    && cd sources \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/xtrx-images -DENABLE_SOAPY=NO .. \
    && make -j${nb_cores} install

# SDRPlay RSP1
FROM base AS libmirisdr
ARG nb_cores=8
RUN git clone https://github.com/f4exb/libmirisdr-4.git \
    && cd libmirisdr-4 \
    && mkdir build; cd build \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/libmirisdr .. \
    && make -j${nb_cores} install

# Soapy main
FROM base AS soapy
ARG nb_cores=8
RUN git clone https://github.com/pothosware/SoapySDR.git \
    && cd SoapySDR \
    && git reset --hard 5838bc9 \
    && mkdir build; cd build \
    && cmake -DCMAKE_INSTALL_PREFIX=/opt/install/SoapySDR .. \
    && make -j${nb_cores} install

# Soapy remote
FROM base AS soapy_remote
ARG nb_cores
COPY --from=soapy --chown=sdr /opt/install /opt/install
RUN git clone https://github.com/pothosware/SoapyRemote.git \
    && cd SoapyRemote \
    && git reset --hard 4f5d717 \
    && mkdir build; cd build \
    && cmake -DCMAKE_INSTALL_PREFIX=/opt/install/SoapySDR -DSOAPY_SDR_INCLUDE_DIR=/opt/install/SoapySDR/include -DSOAPY_SDR_LIBRARY=/opt/install/SoapySDR/lib/libSoapySDR.so .. \
    && make -j${nb_cores} install

# Soapy SDRplay
FROM base AS soapy_sdrplay
ARG nb_cores=8
COPY --from=soapy --chown=sdr /opt/install /opt/install
COPY --from=sdrplay --chown=sdr /opt/install /opt/install
RUN git clone https://github.com/pothosware/SoapySDRPlay.git \
    && cd SoapySDRPlay \
    && git reset --hard 12c3db6 \
    && mkdir build; cd build \
    && cmake -DCMAKE_INSTALL_PREFIX=/opt/install/SoapySDR -DLIBSDRPLAY_INCLUDE_DIRS=/opt/install/libsdrplay/include -DLIBSDRPLAY_LIBRARIES=/opt/install/libsdrplay/lib/libmirsdrapi-rsp.so -DSOAPY_SDR_INCLUDE_DIR=/opt/install/SoapySDR/include -DSOAPY_SDR_LIBRARY=/opt/install/SoapySDR/lib/libSoapySDR.so .. \
    && make -j${nb_cores} install

# Soapy LimeSDR
FROM base AS soapy_limesdr
ARG nb_cores=8
COPY --from=soapy_remote --chown=sdr /opt/install /opt/install
COPY --from=limesdr --chown=sdr /opt/build /opt/build
RUN cd LimeSuite/builddir \
    && cmake -Wno-dev -DCMAKE_INSTALL_PREFIX=/opt/install/LimeSuite -DCMAKE_PREFIX_PATH=/opt/install/SoapySDR .. \
    && make -j${nb_cores} install \
    && cp /opt/install/LimeSuite/lib/SoapySDR/modules0.7/libLMS7Support.so /opt/install/SoapySDR/lib/SoapySDR/modules0.7

# Create a base image plus dependencies
FROM base AS base_deps
COPY --from=cm256cc --chown=sdr /opt/install /opt/install
COPY --from=mbelib --chown=sdr /opt/install /opt/install
COPY --from=serialdv --chown=sdr /opt/install /opt/install
COPY --from=dsdcc --chown=sdr /opt/install /opt/install
COPY --from=codec2 --chown=sdr /opt/install /opt/install
COPY --from=sdrplay --chown=sdr /opt/install /opt/install
COPY --from=airspy --chown=sdr /opt/install /opt/install
COPY --from=rtlsdr --chown=sdr /opt/install /opt/install
COPY --from=plutosdr --chown=sdr /opt/install /opt/install
COPY --from=bladerf --chown=sdr /opt/install /opt/install
COPY --from=hackrf --chown=sdr /opt/install /opt/install
COPY --from=limesdr --chown=sdr /opt/install /opt/install
COPY --from=airspyhf --chown=sdr /opt/install /opt/install
COPY --from=perseus --chown=sdr /opt/install /opt/install
COPY --from=xtrx --chown=sdr /opt/install /opt/install
COPY --from=libmirisdr --chown=sdr /opt/install /opt/install
COPY --from=soapy --chown=sdr /opt/install /opt/install
COPY --from=soapy_remote --chown=sdr /opt/install /opt/install
COPY --from=soapy_sdrplay --chown=sdr /opt/install /opt/install
COPY --from=soapy_limesdr --chown=sdr /opt/install /opt/install

FROM base AS sdrangel_clone
WORKDIR /opt/build
ARG repository=https://github.com/f4exb/sdrangel
ARG branch=master
RUN GIT_SSL_NO_VERIFY=true git clone ${repository} -b ${branch} sdrangel \
    && cd sdrangel \
    && git checkout 0edf1d20e26de8ead3a991dc6310d4874c7d99fc \
    && mkdir build

# The final server version
FROM base_deps AS server
ARG nb_cores=8
COPY --from=sdrangel_clone --chown=sdr /opt/build/sdrangel /opt/build/sdrangel
WORKDIR /opt/build/sdrangel/build
RUN cmake -Wno-dev -DDEBUG_OUTPUT=ON -DBUILD_TYPE=RELEASE -DRX_SAMPLE_24BIT=ON -DBUILD_GUI=OFF -DMIRISDR_DIR=/opt/install/libmirisdr -DAIRSPY_DIR=/opt/install/libairspy -DAIRSPYHF_DIR=/opt/install/libairspyhf -DBLADERF_DIR=/opt/install/libbladeRF -DHACKRF_DIR=/opt/install/libhackrf -DRTLSDR_DIR=/opt/install/librtlsdr -DLIMESUITE_DIR=/opt/install/LimeSuite -DIIO_DIR=/opt/install/libiio -DCM256CC_DIR=/opt/install/cm256cc -DDSDCC_DIR=/opt/install/dsdcc -DSERIALDV_DIR=/opt/install/serialdv -DMBE_DIR=/opt/install/mbelib -DCODEC2_DIR=/opt/install/codec2 -DPERSEUS_DIR=/opt/install/libperseus -DXTRX_DIR=/opt/install/xtrx-images -DSOAPYSDR_DIR=/opt/install/SoapySDR -DCMAKE_INSTALL_PREFIX=/opt/install/sdrangel .. \
    && make -j${nb_cores} install
# Start SDRangel and some more services on which SDRangel depends
COPY start_server.sh /start.sh
COPY restart_server.sh /home/sdr/restart.sh
RUN sudo apt install -y avahi-daemon dbus
WORKDIR /home/sdr
ENTRYPOINT ["/start.sh"]
