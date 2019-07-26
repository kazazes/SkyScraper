FROM ubuntu:bionic

# Get basic packages
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  curl \
  wget \
  git \
  python3 \
  python3-dev \
  python3-pip \
  python3-wheel \
  python3-numpy \
  libcurl3-dev  \
  ca-certificates \
  gcc \
  sox \
  libsox-fmt-mp3 \
  cmake \
  locales \
  pkg-config \
  libsox-dev \
  openjdk-8-jdk \
  g++ \
  unzip

RUN ln -s -f /usr/bin/python3 /usr/bin/python

WORKDIR /tmp

RUN wget https://bootstrap.pypa.io/get-pip.py && \
  python3 get-pip.py && \
  rm get-pip.py

RUN wget https://github.com/mozilla/DeepSpeech/releases/download/v0.5.1/deepspeech-0.5.1-models.tar.gz && \
  tar xvfz deepspeech-0.5.1-models.tar.gz && \
  mv deepspeech-0.5.1-models /models

RUN pip3 install deepspeech

ENTRYPOINT ["deepspeech"]
