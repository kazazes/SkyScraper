FROM pckzs/pybombs

ENV INITSYSTEM on
COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

ENV PATH=$PATH:/opt/gnuradio-3.7.13.4/bin
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/gnuradio-3.7.13.4/lib
ENV PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/gnuradio-3.7.13.4/lib/pkgconfig
ENV PYTHONPATH=$PYTHONPATH:/opt/gnuradio-3.7.13.4/lib/python2.6/site-packages

RUN apt-get -q update \
  && apt-get -y -q install --no-install-recommends \
  build-essential \
  python-apt \
  libcppunit-dev \
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
  virtualenv \
  libpq-dev \
  postgresql-client \
  postgresql-client-common \
  jq \
  ca-certificates \
  openssl

## trunk-recorder needs
RUN export DEBIAN_FRONTEND=noninteractive \
  && apt-get install locales \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

WORKDIR /skyscraper

RUN mkdir build && mkdir src

WORKDIR /skyscraper/src/trunk-player/

RUN git clone https://github.com/kazazes/trunk-player /skyscraper/src/trunk-player/ \
  && virtualenv -p python3 env --prompt='(Trunk Player)' \
  && . env/bin/activate \
  && pip install --no-cache-dir -r requirements.txt

WORKDIR /skyscraper/build/trunk-recorder/

COPY encode-local-sys-0.sh .
COPY start.sh .

RUN git clone -b dev https://github.com/kazazes/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cmake /skyscraper/src/trunk-recorder && make -j$(nproc) && make install \
  && cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder \
  && rm -rf /skyscraper/src/trunk-recorder

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
