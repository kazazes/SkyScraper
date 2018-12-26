FROM debian:buster

RUN apt-get update \
  && apt-get install -y dnsmasq wireless-tools \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

RUN curl -Ls https://github.com/resin-io/resin-wifi-connect/releases/download/v4.1.1/wifi-connect-v4.1.1-linux-%%RESIN_ARCH%%.tar.gz \
  | tar -xvz -C /usr/src/app/

COPY start.sh .

ENV DBUS_SYSTEM_BUS_ADDRESS unix:path=/host/run/dbus/system_bus_socket

CMD ["bash", "start.sh"]
