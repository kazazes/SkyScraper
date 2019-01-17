#! /bin/bash

set -e
set -x

# Pull GC built containers
docker pull gcr.io/skyscraper-sdr/pybombs-amd64:latest
docker pull gcr.io/skyscraper-sdr/pybombs-arm:latest

# Tag GC containers for Docker Hub
docker tag gcr.io/skyscraper-sdr/pybombs-amd64:latest pckzs/pybombs-amd64
docker tag gcr.io/skyscraper-sdr/pybombs-arm:latest pckzs/pybombs-arm

# Push before manifest
docker push pckzs/pybombs-amd64
docker push pckzs/pybombs-arm

# Manifest
docker manifest create -a pckzs/pybombs \
  pckzs/pybombs-arm:latest \
  pckzs/pybombs-amd64:latest

# Architectures
docker manifest annotate  pckzs/pybombs pckzs/pybombs-arm:latest --arch arm64 --os linux
docker manifest annotate  pckzs/pybombs pckzs/pybombs-amd64:latest --arch amd64

# Push multi-arch images
docker manifest push -p pckzs/pybombs
