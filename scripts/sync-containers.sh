#! /bin/bash

set -e
set -x

# Pull GC built containers
docker pull gcr.io/skyscraper-sdr/skyscraper-edge-amd64:latest
docker pull gcr.io/skyscraper-sdr/skyscraper-edge-arm:latest
docker pull gcr.io/skyscraper-sdr/pybombs-amd64:latest
docker pull gcr.io/skyscraper-sdr/pybombs-arm:latest

# Tag GC containers for Docker Hub
docker tag gcr.io/skyscraper-sdr/skyscraper-edge-arm:latest pckzs/bladerf-arm
docker tag gcr.io/skyscraper-sdr/skyscraper-edge-amd64:latest pckzs/bladerf-amd64
docker tag gcr.io/skyscraper-sdr/pybombs-amd64:latest pckzs/pybombs-amd64
docker tag gcr.io/skyscraper-sdr/pybombs-arm:latest pckzs/pybombs-arm

# Push before manifest
docker push pckzs/bladerf-amd64
docker push pckzs/bladerf-arm
docker push pckzs/pybombs-amd64
docker push pckzs/pybombs-arm

# Manifest
docker manifest create -a pckzs/bladerf \
  pckzs/bladerf-arm:latest \
  pckzs/bladerf-amd64:latest

docker manifest create -a pckzs/pybombs \
  pckzs/pybombs-arm:latest \
  pckzs/pybombs-amd64:latest

# Architectures
docker manifest annotate pckzs/bladerf-arm:latest pckzs/bladerf --arch arm64 --os linux
docker manifest annotate pckzs/bladerf-amd64:latest pckzs/bladerf --arch amd64

docker manifest annotate pckzs/pybombs-arm:latest pckzs/pybombs --arch arm64 --os linux
docker manifest annotate pckzs/pybombs-amd64:latest pckzs/pybombs --arch amd64

# Push multi-arch images
docker manifest push -p pckzs/bladerf
docker manifest push -p pckzs/pybombs
