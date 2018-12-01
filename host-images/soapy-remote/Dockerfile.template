FROM pckzs/pybombs-bladerf-armhf

RUN apt-get -q update \
  && apt-get -y -q install --no-install-recommends \
  bladerf-fpga-hostedxa4 \
  build-essential \
  avahi-daemon \
  libavahi-client-dev \
  && rm -rf /var/lib/apt/lists/*

ENV INITSYSTEM on

RUN pybombs -y -v prefix init /pybombs/

COPY start.sh .

ENTRYPOINT [ "/start.sh" ]
