FROM pckzs/sdr-ubuntu

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

ENV PATH=$PATH:/opt/gnuradio-3.7.13.4/bin
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/gnuradio-3.7.13.4/lib
ENV PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/gnuradio-3.7.13.4/lib/pkgconfig
ENV PYTHONPATH=$PYTHONPATH:/opt/gnuradio-3.7.13.4/lib/python2.6/site-packages

RUN apt-get -qq update && \
  apt-get -y -q install --no-install-recommends \
  apt-utils \
  automake \
  build-essential \
  build-essential \
  cmake \
  jq \
  lame \
  libass-dev \
  libboost-all-dev \
  libfdk-aac-dev \
  libfreetype6-dev \
  libpq-dev \
  libssl-dev \
  libtool \
  libuhd-dev \
  locales \
  locales \
  multimon \
  pkg-config \
  postgresql-client \
  postgresql-client-common \
  python-apt \
  python3-dev \
  sox \
  sudo \
  texinfo \
  virtualenv \
  yasm \
  zlib1g-dev \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

WORKDIR /skyscraper/build/trunk-recorder/

COPY encode-local-sys-0.sh .
COPY hostedxA4-latest.rbf xA4.rbf

RUN git clone -b master https://github.com/kazazes/trunk-recorder.git /skyscraper/src/trunk-recorder && \
  cmake -DCMAKE_BUILD_TYPE=Release /skyscraper/src/trunk-recorder \
  && make -j$(nproc) \
  && make install \
  && cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder && \
  rm -rf /skyscraper/src/trunk-recorder

COPY start.sh .

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
