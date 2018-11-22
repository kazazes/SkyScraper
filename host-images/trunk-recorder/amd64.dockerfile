FROM pckzs/pybombs-bladerf-armhf

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

RUN apt-get -q update \
  && apt-get -y -q install --no-install-recommends \
  bladerf-fpga-hostedxa4 \
  build-essential \
  python-apt \
  python-numpy \
  python-scipy \
  apt-utils \
  curl \
  git \
  locales \
  multimon \
  python-dev \
  python3-dev \
  sox \
  sudo \
  lame \
  wget \
  jq \
  ca-certificates

ENV INITSYSTEM on

RUN pybombs -y -v prefix init /pybombs/

WORKDIR /skyscraper

RUN mkdir build && mkdir src

WORKDIR /skyscraper/build/trunk-recorder/

COPY start.sh .
COPY encode-local-sys-0.sh .

RUN . /pybombs/setup_env.sh \
  && git clone https://github.com/kazazes/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cmake /skyscraper/src/trunk-recorder && make -j$(nproc) && make install \
  && cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder \
  && rm -rf /skyscraper/src/trunk-recorder

ENTRYPOINT [ "/skyscraper/build/trunk-recorder/start.sh" ]
