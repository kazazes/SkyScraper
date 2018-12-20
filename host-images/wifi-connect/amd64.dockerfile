FROM debian

ENV INITSYSTEM on
ENV DBUS_SYSTEM_BUS_ADDRESS unix:path=/host/run/dbus/system_bus_socket

RUN apt-get update \
  && apt-get install -y dnsmasq wireless-tools python-dbus \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN curl https://api.github.com/repos/balena-io/wifi-connect/releases/latest -s \
  | grep -hoP 'browser_download_url": "\K.*%%BALENA_ARCH%%\.tar\.gz' \
  | xargs -n1 curl -Ls \
  | tar -xvz -C /usr/src/app/

COPY scripts/start.sh .

CMD ["bash", "start.sh"]
