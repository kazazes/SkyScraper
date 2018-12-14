#! /bin/bash

set -e

cd base-images/pybombs

docker build --pull -t pckzs/pybombs-arm --cache-from=gcr.io/skyscraper-sdr/pybombs-arm -f armhf.dockerfile .
docker build --pull -t pckzs/pybombs-amd64 --cache-from=gcr.io/skyscraper-sdr/pybombs-amd64 -f amd64.dockerfile .

docker manifest create -a pckzs/pybombs \
  pckzs/pybombs-arm:latest \
  pckzs/pybombs-amd64:latest

docker manifest annotate  pckzs/pybombs pckzs/pybombs-arm:latest --arch arm64 --os linux
docker manifest annotate  pckzs/pybombs pckzs/pybombs-amd64:latest --arch amd64
