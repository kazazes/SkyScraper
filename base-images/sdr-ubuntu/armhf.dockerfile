FROM balenalib/odroid-xu4-ubuntu:cosmic as pybombs-slim

RUN [ "cross-build-start" ]

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
  apt-get install -y software-properties-common && \
  add-apt-repository ppa:bladerf/bladerf && \
  apt-get update && apt-get install -y \
  automake \
  git \
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

WORKDIR /home
CMD ["bash"]

RUN [ "cross-build-end" ]
