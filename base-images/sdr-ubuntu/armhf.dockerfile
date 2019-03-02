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
  add-apt-repository -y ppa:pothosware/framework && \
  apt-get update

RUN apt-get install -y \
  automake \
  git \
  pothos-all \
  soapysdr-tools \
  python-soapysdr \
  python-numpy \
  python3-soapysdr \
  python3-numpy \
  osmo-sdr \
  soapysdr-module-osmosdr \
  rtl-sdr \
  soapysdr-module-rtlsdr \
  bladerf \
  soapysdr-module-bladerf \
  uhd-host uhd-soapysdr soapysdr-module-uhd \
  swig \
  gnuradio \
  libbladerf-udev \
  libbladerf-dev \
  bladerf-fpga-hostedx40 \
  bladerf \
  gr-osmosdr \
  gr-iqbal \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN rm -rf /tmp/* /var/tmp/*
RUN [ "cross-build-end" ]

WORKDIR /home
CMD ["bash"]
