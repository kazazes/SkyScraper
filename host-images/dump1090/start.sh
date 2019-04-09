#! /bin/bash

set -e

mkdir -p /data/adsb

./dump1090 --fix --enable-agc --net --write-json /data/adsb/adsb-$(date -Iminutes).json
