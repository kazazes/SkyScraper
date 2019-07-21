FROM skyscraperai/sdr-ubuntu

ENV ARCH=amd64

# Static ffmpeg binaries from https://www.johnvansickle.com/ffmpeg/
COPY ./ffmpeg-4.1.2-$ARCH-static/* /usr/bin/

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib:/usr/local/lib
RUN echo "export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:$(pkg-config --variable pc_path pkg-config)" > ~/.profile

RUN apt-get -qq update && \
  apt-get -y -q install --no-install-recommends \
  apt-utils \
  autoconf \
  automake \
  build-essential \
  ca-certificates \
  curl \
  git \
  jq \
  lame \
  libass-dev \
  libcppunit-dev \
  libfdk-aac-dev \
  libuhd-dev \
  libtool \
  locales \
  mosquitto \
  mosquitto-clients \
  openssl \
  pkg-config \
  sox \
  sudo \
  wget \
  yasm \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

WORKDIR /skyscraper/build/trunk-recorder/

RUN git clone https://github.com/Sibyl-Vision/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && ldconfig \
  && cmake -DCMAKE_BUILD_TYPE=Release /skyscraper/src/trunk-recorder \
  && make -j$(nproc) \
  && make install \
  && cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder && \
  rm -rf /skyscraper/src/trunk-recorder

COPY start.sh encode-local-sys-0.sh ./

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
