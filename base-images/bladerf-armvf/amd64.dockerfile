FROM ubuntu:xenial AS gnuradio

RUN [ "cross-build-start" ]

ENV DEBIAN_FRONTEND noninteractive
ENV PYBOMBS_PREFIX=/pybombs

COPY gnuradio.sh /etc/profile.d/gnuradio.sh
COPY gnuradio.conf /etc/ld.so.conf.d/gnuradio.conf

RUN echo "deb http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && echo "deb-src http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 188FE585DD24922CE9CD1EE9BE99746B2FB21B35

RUN apt-get -q update \
  && apt-get -y -q install \
  apt-utils \
  aria2 \
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
  pkg-config \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /src/gnuradio-build
COPY build-gnuradio.sh build-gnuradio.sh

RUN /bin/bash -c "$(curl -sL https://git.io/vokNn)" \
  && chmod +x ./build-gnuradio.sh \
  && apt-get -q update \
  && apt-fast -y install \
  autoconf \
  automake \
  ccache \
  cmake \
  doxygen \
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
  libzmq1-dev \
  python-cheetah \
  python-dev \
  python-lxml \
  python-mako \
  python-numpy \
  python-requests \
  python-zmq \
  r-base-dev \
  swig \
  wget \
  && ./build-gnuradio.sh -ja -v -m prereqs gitfetch \
  && cd gnuradio \
  && git checkout -b gnuradio-v3.7.13.4 v3.7.13.4 \
  && mkdir build \
  && cd build \
  && cmake -DCMAKE_INSTALL_PREFIX=/opt/gnuradio-3.7.13.4 ../ \
  && make -j$(nproc) \
  && make install \
  && ldconfig -v | grep gnuradio \
  && rm -rf /var/lib/apt/lists/*

RUN apt-get update \
  && pybombs -vv install \
  bladeRF \
  gnuradio \
  gr-osmosdr \
  soapybladerf \
  soapyremote \
  soapysdr \
  && sed 's/@BLADERF_GROUP@/plugdev/g' /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules.in > /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules \
  && mkdir -p /etc/udev/rules.d/ \
  && cp /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules /etc/udev/rules.d/ \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /pybombs/src/* /tmp/* \
  && apt-get -y autoremove --purge \
  && apt-get -y clean && apt-get -y autoclean

RUN [ "cross-build-end" ]
