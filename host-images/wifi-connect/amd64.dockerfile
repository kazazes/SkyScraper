FROM resin/%%RESIN_MACHINE_NAME%%-debian

ENV INITSYSTEM on
ENV DBUS_SYSTEM_BUS_ADDRESS unix:path=/host/run/dbus/system_bus_socket

RUN apt-get update \
  && apt-get install -y dnsmasq wireless-tools \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN curl https://api.github.com/repos/balena-io/wifi-connect/releases/latest -s \
  | grep -hoP 'browser_download_url": "\K.*%%RESIN_ARCH%%\.tar\.gz' \
  | xargs -n1 curl -Ls \
  | tar -xvz -C /usr/src/app/

COPY scripts/start.sh .

CMD ["bash", "start.sh"]
