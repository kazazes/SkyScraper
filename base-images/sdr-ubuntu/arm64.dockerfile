FROM balenalib/odroid-xu4-ubuntu:cosmic
RUN [ "cross-build-start" ]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
  apt-get install -y software-properties-common && \
  add-apt-repository -y ppa:bladerf/bladerf && \
  add-apt-repository -y ppa:ettusresearch/uhd && \
  add-apt-repository -y ppa:pothosware/support && \
  add-apt-repository -y ppa:myriadrf/drivers && \
  add-apt-repository -y ppa:ettusresearch/uhd && \
  add-apt-repository -y ppa:pothosware/framework

RUN apt-get install -y --no-install-recommends \
  automake \
  bladerf \
  bladerf-fpga-hostedx40 \
  cmake \
  git \
  gnuradio \
  gnuradio-dev \
  gr-iqbal \
  gr-osmosdr \
  libbladerf-dev \
  libbladerf-udev \
  libboost-all-dev \
  libuhd-dev \
  libssl-dev \
  libusb-1.0-0.dev \
  osmo-sdr \
  python3-pothos \
  pothos-python-dev \
  python-numpy \
  python-soapysdr \
  python3-numpy \
  python3-soapysdr \
  rtl-sdr \
  soapysdr-module-bladerf \
  soapysdr-module-osmosdr \
  soapysdr-module-rtlsdr \
  soapysdr-tools \
  soapysdr-module-uhd \
  swig \
  uhd-host \
  uhd-soapysdr \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN rm -rf /tmp/* /var/tmp/*
RUN [ "cross-build-end" ]

WORKDIR /home
CMD ["bash"]
