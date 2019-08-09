FROM ubuntu:xenial

ENV DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

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
  build-essential \
  libcairo2 \
  libbladerf-dev \
  librtlsdr-dev \
  pkg-config \
  python3-dev \
  python3 \
  python3-pip \
  python3-setuptools \
  python3-soapysdr \
  rtl-sdr \
  soapysdr-module-bladerf \
  soapysdr-module-rtlsdr \
  soapysdr-tools \
  swig && \
  rm -rf /var/apt/lists/*

RUN pip3 install --upgrade pip

WORKDIR /usr/app
COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY *.py .

RUN python main.py
