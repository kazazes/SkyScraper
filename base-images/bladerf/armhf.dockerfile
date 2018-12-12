FROM resin/odroid-xu4-ubuntu:xenial AS gnuradio

RUN [ "cross-build-start" ]

ENV DEBIAN_FRONTEND noninteractive

# Make this gnuradio install globally available
COPY gnuradio.sh /etc/profile.d/gnuradio.sh
# ...and it's libraries
COPY gnuradio.conf /etc/ld.so.conf.d/gnuradio.conf

# BladeRF PPA
RUN echo "deb http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && echo "deb-src http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 188FE585DD24922CE9CD1EE9BE99746B2FB21B35

RUN apt-get -q update \
  && apt-get -y -q install --no-install-recommends \
  apt-utils \
  software-properties-common \
  aria2 \
  wget \
  git \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /src/gnuradio-build

RUN apt-get -q update \
  && apt-get -y --ignore-missing install --no-install-recommends \
  build-essential \
  cmake \
  autoconf \
  automake \
  ccache \
  cmake \
  fort77 \
  g++ \
  git-core \
  libboost-all-dev \
  libcppunit-dev \
  libfftw3-dev \
  libfontconfig1-dev \
  libgsl0-dev \
  liborc-0.4-0 \
  liborc-0.4-dev \
  libsdl1.2-dev \
  libtool \
  libusb-1.0-0-dev \
  libusb-1.0-0-dev \
  libusb-dev \
  libzmq-dev \
  python-cheetah \
  python-dev \
  python-lxml \
  python-mako \
  python-numpy \
  python-requests \
  python-zmq \
  r-base-dev \
  swig \
  bladerf \
  bladerf-fpga-hostedxa4 \
  build-essential \
  ca-certificates \
  cmake \
  git \
  libbladerf-dev \
  libncurses5-dev \
  libtecla-dev \
  libtecla1 \
  libusb-1.0-0 \
  libusb-1.0-0-dev \
  pkg-config

# Add third party SDR util PPAs and their packages
RUN add-apt-repository -y ppa:myriadrf/drivers \
  && add-apt-repository -y ppa:pothosware/support \
  && add-apt-repository -y ppa:pothosware/framework \
  && apt-get update && \
  apt-get -y install \
  python3-pothos \
  pothos-python-dev \
  soapysdr \
  python-soapysdr \
  python3-soapysdr \
  soapysdr-module-bladerf \
  && rm -rf /var/lib/apt/lists/*

RUN wget http://www.sbrac.org/files/build-gnuradio && chmod a+x build-gnuradio && ./build-gnuradio

# Just fetch git repos for gnuradio-etc
RUN chmod +x ./build-gnuradio.sh \
  && ./build-gnuradio.sh -j8 -v -m gitfetch

# Build the bugger
RUN cd gnuradio \
  && git checkout -b gnuradio-v3.7.13.4 v3.7.13.4 \
  && mkdir build \
  && cd build \
  && cmake -DCMAKE_INSTALL_PREFIX=/opt/gnuradio-3.7.13.4 ../ \
  && make -j8 \
  && make install \
  && ldconfig -v | grep gnuradio \
  && cd .. \
  && rm -rf gnuradio

WORKDIR /src/gnuradio-build

# gr-iqbal
RUN cd gr-iqbal  \
  && mkdir build \
  && cd build \
  && cmake -DCMAKE_INSTALL_PREFIX=/opt/gnuradio-3.7.13.4 ../ \
  && make -j8 && make install && ldconfig \
  && cd .. \
  && rm -rf gr-osmosdr

WORKDIR /src/gnuradio-build

# osmosdr
RUN cd gr-osmosdr  \
  && mkdir build \
  && cd build \
  && cmake -DCMAKE_INSTALL_PREFIX=/opt/gnuradio-3.7.13.4 ../ \
  && make -j8 && make install && ldconfig \
  && cd .. \
  && rm -rf gr-osmosdr

RUN rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/* \
  && apt-get -y autoremove --purge \
  && apt-get -y clean && apt-get -y autoclean

RUN [ "cross-build-end" ]
