FROM ubuntu:xenial

RUN apt-get update && \
  apt-get install -y software-properties-common --no-install-recommends && \
  add-apt-repository -y ppa:bladerf/bladerf && \
  add-apt-repository -y ppa:pothosware/framework && \
  add-apt-repository -y ppa:pothosware/support && \
  add-apt-repository -y ppa:myriadrf/drivers && \
  add-apt-repository -y ppa:ettusresearch/uhd && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  bladerf \
  nodejs \
  libbladerf-dev \
  librtlsdr-dev \
  yarn \
  python-dev \
  python3-soapysdr \
  python3 \
  build-essential \
  rtl-sdr \
  soapysdr-module-bladerf \
  soapysdr-module-rtlsdr \
  soapysdr-tools \
  swig && \
  rm -rf /var/apt/lists/*

WORKDIR /usr/app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY *.py .
