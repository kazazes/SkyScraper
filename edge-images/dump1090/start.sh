#! /bin/bash

set -e

if [[ -v ADSB_DISABLED ]]; then
    echo "ADSB disabled. Sleeping."
    sleep infinity
fi

mkdir -p /data/adsb

./dump1090 --fix --enable-agc --net --write-json /data/adsb/adsb-$(date -Iminutes).json
