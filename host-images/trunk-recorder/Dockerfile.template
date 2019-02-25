FROM pckzs/pybombs

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

ENV PATH=$PATH:/opt/gnuradio-3.7.13.4/bin
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/gnuradio-3.7.13.4/lib
ENV PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/opt/gnuradio-3.7.13.4/lib/pkgconfig
ENV PYTHONPATH=$PYTHONPATH:/opt/gnuradio-3.7.13.4/lib/python2.6/site-packages

RUN apt-get -qq update && \
  apt-get -y -q install --no-install-recommends \
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
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

RUN wget http://ffmpeg.org/releases/ffmpeg-4.1.tar.bz2 && \
  tar xjvf ffmpeg-4.1.tar.bz2 && \
  cd ffmpeg-4.1 && \
  ./configure \
  --pkg-config-flags="--static" \
  --bindir="/usr/local/bin" \
  --enable-gpl \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-hardcoded-tables \
  --disable-doc \
  --enable-nonfree && \
  make -j$(nproc) && \
  make install \
  && rm -rf ffmpeg-4.1.tar.bz2 ffmpeg-4.1

WORKDIR /skyscraper/build/trunk-recorder/

COPY encode-local-sys-0.sh .
COPY hostedxA4-latest.rbf xA4.rbf

RUN git clone https://github.com/Sibyl-Vision/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cd /skyscraper/src/trunk-recorder \
  && git checkout 6423b238d26b034eda6cb93c5a44fb666a076d0f

RUN cmake -DCMAKE_BUILD_TYPE=Release /skyscraper/src/trunk-recorder \
  && make -j$(nproc) \
  && make install

RUN cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder && \
  rm -rf /skyscraper/src/trunk-recorder

COPY start.sh .

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
