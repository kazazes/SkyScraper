FROM ubuntu:xenial AS gnuradio

ENV DEBIAN_FRONTEND noninteractive
ENV PYBOMBS_PREFIX=/pybombs

COPY ./private-github-release-download.sh /pybombs/download-release.sh

RUN echo "deb http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && echo "deb-src http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 188FE585DD24922CE9CD1EE9BE99746B2FB21B35 \
  && sed -i -e "s/archive.ubuntu.com/mirrors.accretive-networks.net/" /etc/apt/sources.list \
  && sed -i -e "s/ports.ubuntu.com/us.ports.ubuntu.com/" /etc/apt/sources.list

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
  ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

RUN /pybombs/download-release.sh \
  && tar -xvzf ./pybombs-armhf.tar.gz -C /pybombs/ \
  && rm -f ./pybombs-armhf.tar.gz

RUN curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py && python /tmp/get-pip.py \
  && echo "[global]\nno-cache-dir = 0" > /etc/pip.conf \
  && pip install git+git://github.com/gnuradio/pybombs.git \
  && rm -rf /root/.cache/

RUN pybombs recipes add-defaults \
  && sed -i -e "s/-DENABLE_GRC=ON/-DENABLE_GRC=OFF/g" -e "s/-DENABLE_GR_QTGUI=ON/-DENABLE_GR_QTGUI=OFF/g" -e "s/-DENABLE_DOXYGEN=$builddocs/-DENABLE_DOXYGEN=OFF/g" /root/.pybombs/recipes/gr-recipes/gnuradio.lwr
RUN pybombs -y prefix init ${PYBOMBS_PREFIX} -a master \
  && pybombs config default_prefix master && pybombs config makewidth $(nproc) \
  && pybombs config --env DEBIAN_FRONTEND noninteractive \
  && pybombs config --package libqwt-dev forceinstalled true \
  && pybombs config --package libqwt5-qt4 forceinstalled true \
  && pybombs config --package pygtk forceinstalled true \
  && pybombs config --package pyqt4 forceinstalled true \
  && pybombs config --package pyqt4-dev-tools forceinstalled true \
  && pybombs config --package pyqwt5 forceinstalled true \
  && pybombs config --package python-qwt5-qt4 forceinstalled true \
  && pybombs config --package qt4 forceinstalled true \
  && pybombs config --package qt5 forceinstalled true \
  && pybombs config --package qwt5 forceinstalled true \
  && pybombs config --package qwt6 forceinstalled true \
  && pybombs config --package wxpython forceinstalled true \
  && pybombs config --package gnuradio gitbranch v3.7.13.4 \
  && pybombs config --package bladeRF gitrev db24d41

RUN apt-get update && pybombs -vv install --deps-only gnuradio \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /tmp/* \
  && apt-get -y purge doxygen \
  && apt-get -y autoremove --purge \
  && apt-get -y clean && apt-get -y autoclean

FROM gnuradio as dependencies

WORKDIR /pybombs/

RUN apt-get update && pybombs -v install --deps-only \
  soapysdr \
  soapyremote \
  soapybladerf \
  gr-osmosdr \
  bladeRF \
  && sed 's/@BLADERF_GROUP@/plugdev/g' ./src/bladeRF/host/misc/udev/88-nuand.rules.in > ./src/bladeRF/host/misc/udev/88-nuand.rules \
  && mkdir -p /etc/udev/rules.d/ \
  && cp ./src/bladeRF/host/misc/udev/88-nuand.rules /etc/udev/rules.d/ \
  && rm -rf /var/lib/apt/lists/* /tmp/* \
  && apt-get -y autoremove --purge \
  && apt-get -y clean && apt-get -y autoclean

COPY ./gnuradio-runtime.conf /root/.gnuradio/config.conf

ENV INITSYSTEM on

FROM dependencies as trunk-recorder

WORKDIR /skyscraper

RUN mkdir build && mkdir src

WORKDIR /skyscraper/build/trunk-recorder/
COPY start.sh .
COPY ./encode-local-sys-0.sh /usr/local/bin/encode-local.sh

RUN chmod +x start.sh && chmod +x /usr/local/bin/encode-local.sh \
  && . /pybombs/setup_env.sh \
  && git clone https://github.com/kazazes/trunk-recorder.git /skyscraper/src/trunk-recorder \
  && cmake /skyscraper/src/trunk-recorder && make -j$(nproc) && make install \
  && cp /skyscraper/build/trunk-recorder/recorder /usr/local/bin/trunk-recorder \
  && rm -rf /skyscraper/src/trunk-recorder

CMD [ "/bin/bash", "/skyscraper/build/trunk-recorder/start.sh" ]
