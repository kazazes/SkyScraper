FROM skyscraperai/sdr-ubuntu:arm64

ENV ARCH=arm64

# Static ffmpeg binaries from https://www.johnvansickle.com/ffmpeg/
COPY ./ffmpeg-4.1.2-$ARCH-static/* /usr/bin/

RUN [ "cross-build-start" ]

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

RUN apt-get -qq update && \
  apt-get -y -q install --no-install-recommends \
  build-essential \
  libcppunit-dev \
  apt-utils \
  curl \
  git \
  locales \
  multimon \
  sox \
  sudo \
  lame \
  wget \
  jq \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN export DEBIAN_FRONTEND=noninteractive && \
  apt-get -qq update \
  && apt-get install -y \
  openssl \
  locales \
  autoconf \
  automake \
  build-essential \
  libass-dev \
  libfreetype6-dev \
  libtool \
  pkg-config \
  texinfo \
  zlib1g-dev \
  yasm \
  libfdk-aac-dev \
  mosquitto \
  mosquitto-clients \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

WORKDIR /skyscraper/build/trunk-recorder/

COPY hostedxA4-latest.rbf xA4.rbf

RUN git clone https://github.com/Sibyl-Vision/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cd /skyscraper/src/trunk-recorder \
  && git checkout 6423b238d26b034eda6cb93c5a44fb666a076d0f

RUN cmake -DCMAKE_BUILD_TYPE=Release /skyscraper/src/trunk-recorder \
  && make -j$(nproc) \
  && make install

RUN cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder && \
  rm -rf /skyscraper/src/trunk-recorder

COPY start.sh encode-local-sys-0.sh ./

RUN [ "cross-build-end" ]

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
