#! /bin/bash

set -e

./scripts/gen-dockerfiles.sh

cd base-images/bladerf

docker build --pull -t pckzs/bladerf-arm -f armhf.dockerfile .
docker build --pull -t pckzs/bladerf-amd -f amd64.dockerfile .

docker push pckzs/bladerf-arm
docker push pckzs/bladerf-amd

docker manifest create pckzs/bladerf \
  pckzs/bladerf-arm:latest \
  pckzs/bladerf-amd64:latest

docker manifest push -p docker.io/pckzs/bladerf:latest
