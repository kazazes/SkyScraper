#! /bin/bash

set -e

cd base-images/bladerf

docker build --pull -t pckzs/bladerf-arm -f armhf.dockerfile .

docker build --pull -t pckzs/bladerf-amd -f amd64.dockerfile .

docker manifest create pckzs/bladerf \
  pckzs/bladerf-arm:latest \
  pckzs/bladerf-amd64:latest

docker manifest annotate pckzs/bladerf-arm:latest pckzs/bladerf --arch arm
docker manifest annotate pckzs/bladerf-amd64:latest pckzs/bladerf --arch amd64
