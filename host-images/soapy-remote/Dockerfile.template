FROM pckzs/pybombs-soapyremote
ENV INITSYSTEM on

RUN apt-get -q update \
  && apt-get -y -q install --no-install-recommends \
  bladerf-fpga-hostedxa4 \
  avahi-daemon \
  libavahi-client-dev \
  && rm -rf /var/lib/apt/lists/*

RUN pybombs -y -v prefix init /pybombs/

COPY start.sh .

ENTRYPOINT [ "/start.sh" ]
