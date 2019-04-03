FROM skyscraperai/sdr-ubuntu

ENV ARCH=amd64

# Static ffmpeg binaries from https://www.johnvansickle.com/ffmpeg/
COPY ./ffmpeg-4.1.2-$ARCH-static/* /usr/bin/



ENV PATH=$PATH:/usr/bin/
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/x86_64-linux-gnu/
ENV PYTHONPATH=$PYTHONPATH:/usr/lib/python2.7/dist-packages

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

RUN apt-get -qq update && \
  apt-get -y -q install \
  apt-utils \
  autoconf \
  automake \
  build-essential \
  build-essential \
  ca-certificates \
  curl \
  doxygen \
  g++ \
  git \
  gnuradio-dev \
  gr-osmosdr \
  jq \
  lame \
  libass-dev \
  libboost-all-dev \
  libcomedi-dev \
  libcppunit-dev \
  libcppunit-dev \
  libfftw3-dev \
  libgsl-dev \
  libsdl1.2-dev \
  libusb-1.0-0-dev \
  libzmq3-dev \
  locales \
  locales \
  mosquitto \
  mosquitto-clients \
  multimon \
  openssl \
  pkg-config \
  pkg-config \
  python-cheetah \
  python-dev \
  python-lxml \
  python-mako \
  python-numpy \
  python-sip-dev \
  python-sphinx \
  python-wxgtk3.0 \
  sox \
  sudo \
  wget \
  yasm \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

WORKDIR /skyscraper/build/trunk-recorder/

COPY hostedxA4-latest.rbf xA4.rbf

RUN git clone https://github.com/Sibyl-Vision/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cd /skyscraper/src/trunk-recorder

RUN PKG_CONFIG_PATH=$PKG_CONFIG_PATH:$(pkg-config --variable pc_path pkg-config) && \
  cmake -DCMAKE_BUILD_TYPE=Release /skyscraper/src/trunk-recorder \
  && make -j8 \
  && make install

RUN cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder && \
  rm -rf /skyscraper/src/trunk-recorder

COPY start.sh encode-local-sys-0.sh ./



CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
