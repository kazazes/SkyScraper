FROM pckzs/pybombs

ENV INITSYSTEM on
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
  openssl \
  htop \
  traceroute \
  nmap

RUN echo "en_US.UTF-8 UTF-8" >/etc/locale.gen && \
  locale-gen

WORKDIR /root
