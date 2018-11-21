FROM resin/odroid-xu4-ubuntu:xenial AS gnuradio

RUN [ "cross-build-start" ]

ENV DEBIAN_FRONTEND noninteractive
ENV PYBOMBS_PREFIX=/pybombs

RUN echo "deb http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && echo "deb-src http://ppa.launchpad.net/bladerf/bladerf/ubuntu xenial main" >> /etc/apt/sources.list \
  && apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 188FE585DD24922CE9CD1EE9BE99746B2FB21B35

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
  python-dev \
  python3-dev \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/* \
  && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen \
  && locale-gen

RUN curl https://bootstrap.pypa.io/get-pip.py -o /tmp/get-pip.py && python /tmp/get-pip.py \
  && echo "[global]\nno-cache-dir = 0" > /etc/pip.conf \
  && pip install git+git://github.com/gnuradio/pybombs.git \
  && rm -rf /root/.cache/ /tmp/get-pip.py

RUN pybombs recipes add-defaults \
  && pybombs -y prefix init ${PYBOMBS_PREFIX} -a master \
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
  && pybombs config --package bladeRF gitrev db24d41\
  && sed -i -e "s/-DENABLE_GRC=ON/-DENABLE_GRC=OFF/g" -e "s/-DENABLE_GR_QTGUI=ON/-DENABLE_GR_QTGUI=OFF/g" \
  -e "s/-DENABLE_DOXYGEN=$builddocs/-DENABLE_DOXYGEN=OFF/g" /root/.pybombs/recipes/gr-recipes/gnuradio.lwr

RUN apt-get update && pybombs -vv install gnuradio

RUN pybombs -vv install soapysdr \
  soapyremote \
  soapybladerf \
  gr-osmosdr \
  bladeRF \
  && sed 's/@BLADERF_GROUP@/plugdev/g' /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules.in > /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules \
  && mkdir -p /etc/udev/rules.d/ \
  && cp /pybombs/src/bladeRF/host/misc/udev/88-nuand.rules /etc/udev/rules.d/ \
  && rm -rf /tmp/* \
  && apt-get -y autoremove --purge \
  && apt-get -y clean && apt-get -y autoclean \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /pybombs/src

RUN [ "cross-build-end" ]
