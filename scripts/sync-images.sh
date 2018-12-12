#! /bin/bash

set -e
set -x

docker pull gcr.io/skyscraper-sdr/skyscraper-edge-amd64:latest
docker tag gcr.io/skyscraper-sdr/skyscraper-edge-amd64:latest pckzs/bladerf-amd64
docker push pckzs/bladerf-amd64

docker pull gcr.io/skyscraper-sdr/skyscraper-edge-arm:latest
docker tag gcr.io/skyscraper-sdr/skyscraper-edge-arm:latest pckzs/bladerf-arm
docker push pckzs/bladerf-arm

docker manifest create -a pckzs/bladerf \
  pckzs/bladerf-arm:latest \
  pckzs/bladerf-amd64:latest

docker manifest annotate pckzs/bladerf-arm:latest pckzs/bladerf --arch arm64
docker manifest annotate pckzs/bladerf-amd64:latest pckzs/bladerf --arch amd64

docker manifest push -p pckzs/bladerf:latest
