FROM debian:10-slim

## Mount host docker for cache
# -v /var/run/docker.sock:/var/run/docker.sock

RUN apt-get update && \
  apt-get install -y --no-install-recommends \
  apt-transport-https \
  ca-certificates \
  wget \
  curl \
  gnupg2 \
  unzip \
  git \
  python-pip \
  python-dev \
  libffi-dev \
  openssl \
  gcc \
  libc-dev \
  make\
  software-properties-common && \
  curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
  add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/debian \
  $(lsb_release -cs) \
  stable" && \
  apt-get update && \
  apt-get install -y --no-install-recommends docker-ce && \
  rm -rf /var/lib/apt/lists/*


WORKDIR /root
RUN wget https://github.com/balena-io/balena-cli/releases/download/v11.7.2/balena-cli-v11.7.2-linux-x64-standalone.zip
RUN curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
  chmod +x /usr/local/bin/docker-compose

RUN unzip balena-cli-v11.7.2-linux-x64-standalone.zip && \
  mv balena-cli/balena /usr/local/bin/balena

COPY sync.sh /usr/local/bin

CMD [ "sync.sh" ]
