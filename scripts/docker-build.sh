#! /bin/bash

set -e

cd base-images/bladerf

docker build --pull -t pckzs/bladerf-arm --cache-from=gcr.io/skyscraper-sdr/skyscraper-edge-arm -f armhf.dockerfile .
docker build --pull -t pckzs/bladerf-amd --cache-from=gcr.io/skyscraper-sdr/skyscraper-edge-amd64 -f amd64.dockerfile .

docker manifest create pckzs/bladerf \
  pckzs/bladerf-arm:latest \
  pckzs/bladerf-amd64:latest

docker manifest annotate pckzs/bladerf-arm:latest pckzs/bladerf --arch arm
docker manifest annotate pckzs/bladerf-amd64:latest pckzs/bladerf --arch amd64
