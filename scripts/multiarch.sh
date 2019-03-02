#! /bin/bash

set -e
set -x

./scripts/gen-dockerfiles.sh

docker build -f base-images/sdr-ubuntu/amd64.dockerfile -t pckzs/sdr-ubuntu:amd64 base-images/sdr-ubuntu/
docker build -f base-images/sdr-ubuntu/armhf.dockerfile -t pckzs/sdr-ubuntu:arm64 base-images/sdr-ubuntu/

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
