FROM jupyter/datascience-notebook

USER root

RUN apt-get update &&\
  apt-get install -y software-properties-common --no-install-recommends && \
  add-apt-repository -y ppa:bladerf/bladerf && \
  add-apt-repository -y ppa:pothosware/framework && \
  add-apt-repository -y ppa:pothosware/support && \
  add-apt-repository -y ppa:myriadrf/drivers && \
  add-apt-repository -y ppa:ettusresearch/uhd

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  bladerf \
  libbladerf-dev \
  swig \
  python-dev \
  python3-soapysdr \
  soapysdr-module-bladerf \
  rtl-sdr && \
  rm -rf /var/apt/lists/*

COPY 00-volume-mount.sh /usr/local/bin/start-notebook.d/

USER $NB_USER
