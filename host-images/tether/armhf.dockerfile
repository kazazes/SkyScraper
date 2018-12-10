FROM resin/%%BALENA_MACHINE_NAME%%-debian

ENV INITSYSTEM on

RUN apt-get update \
  && apt-get install -y dnsmasq \
  wireless-tools \
  libimobiledevice-dev \
  libimobiledevice-utils \
  usbmuxd \
  network-manager \
  ipheth-utils \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY scripts/start.sh .

CMD ["bash", "start.sh"]
