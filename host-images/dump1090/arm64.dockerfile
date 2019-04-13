FROM balenalib/odroid-xu4-ubuntu:cosmic

RUN apt-get update && \
  apt-get install -y software-properties-common

RUN  add-apt-repository ppa:bladerf/bladerf && \
  apt-get update && \
  apt-get install -y \
  bladerf \
  libbladerf-dev \
  librtlsdr-dev \
  git \
  build-essential \
  pkg-config \
  dh-systemd \
  libncurses5-dev

RUN git clone https://github.com/skyscraperai/dump1090 /dump1090
WORKDIR /dump1090

RUN dpkg-buildpackage -b

COPY start.sh .

ENTRYPOINT ["./start.sh" ]
