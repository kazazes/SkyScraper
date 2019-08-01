FROM jupyter/datascience-notebook:307ad2bb5fce

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
  librtlsdr-dev \
  python-dev \
  python3-soapysdr \
  rtl-sdr \
  soapysdr-module-bladerf \
  soapysdr-module-rtlsdr \
  soapysdr-tools \
  swig && \
  rm -rf /var/apt/lists/*

COPY 00-volume-mount.sh /usr/local/bin/start-notebook.d/
COPY jupyter_notebook_config.py /etc/jupyter

USER $NB_USER
