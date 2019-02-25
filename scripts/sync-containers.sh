#! /bin/bash

set -e
set -x

# Push before manifest
docker push pckzs/sdr-ubuntu:amd64
docker push pckzs/sdr-ubuntu:arm64

# Manifest
docker manifest create -a pckzs/sdr-ubuntu \
   pckzs/sdr-ubuntu:arm64 \
   pckzs/sdr-ubuntu:amd64

# Architectures
docker manifest annotate pckzs/sdr-ubuntu pckzs/sdr-ubuntu:arm64 --arch arm --os linux
docker manifest annotate pckzs/sdr-ubuntu pckzs/sdr-ubuntu:amd64 --arch amd64

# Push multi-arch images
docker manifest push -p pckzs/sdr-ubuntu
