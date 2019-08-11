#!/bin/bash

export MODELSERVER_IMAGE=quay.io/assemblyai-onprem/model-server:3.0.1_default_cpu

set -e
set -x

cd $(mktemp -d)

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

useradd -G docker --shell /bin/bash --create-home spire

echo "export MODELSERVER_IMAGE=$MODELSERVER_IMAGE" >>/etc/profile

su - spire
cd ~

docker login -u="assemblyai-onprem+skyscraper_trial" -p="56TW7MX6LPK4HGUT7IHGGRYV6RCE54W2KF1G44BXPFJYRXBWJDS7H13DM80AYUGM" quay.io

docker pull ${MODELSERVER_IMAGE}
curl -o docker-compose.yml https://gist.githubusercontent.com/kazazes/f04ac32c9f44ffc1df2bf9ee5798b58d/raw/18e690a2ec9d7dee585e2a0bfe50adbf37379e46/asdf.yml

source /etc/profile

docker-compose up
