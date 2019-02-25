#! /bin/bash

set -e

cd base-images/sdr-ubuntu

docker build --pull -t pckzs/sdr-ubuntu:amd64 -f amd64.dockerfile .
docker build --pull -t pckzs/sdr-ubuntu:arm64 -f armhf.dockerfile .

docker manifest create -a pckzs/sdr-ubuntu \
  pckzs/sdr-ubuntu:arm64 \
  pckzs/sdr-ubuntu:amd64

docker manifest annotate  pckzs/sdr-ubuntu pckzs/sdr-ubuntu:arm64 --arch arm64 --os linux
docker manifest annotate  pckzs/sdr-ubuntu pckzs/sdr-ubuntu:amd64 --arch amd64
