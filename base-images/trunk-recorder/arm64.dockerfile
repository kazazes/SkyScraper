FROM skyscraperai/sdr-ubuntu:arm64

ENV ARCH=arm64

# Static ffmpeg binaries from https://www.johnvansickle.com/ffmpeg/
COPY ./ffmpeg-4.1.2-$ARCH-static/* /usr/bin/

RUN [ "cross-build-start" ]

ENV PATH=$PATH:/usr/bin/
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib/x86_64-linux-gnu/
ENV PYTHONPATH=$PYTHONPATH:/usr/lib/python2.7/dist-packages

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
  git g++ libboost-all-dev python-dev python-mako \
  python-numpy python-wxgtk3.0 python-sphinx python-cheetah swig libzmq3-dev \
  libfftw3-dev libgsl-dev libcppunit-dev doxygen libcomedi-dev libqt4-opengl-dev \
  python-qt4 libqwt-dev libsdl1.2-dev libusb-1.0-0-dev python-gtk2 python-lxml \
  pkg-config python-sip-dev \
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
  pkg-config \
  yasm \
  mosquitto \
  mosquitto-clients \
  gnuradio-dev \
  gr-osmosdr \
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

RUN [ "cross-build-end" ]

CMD [ "/skyscraper/build/trunk-recorder/start.sh" ]
