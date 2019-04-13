#! /bin/bash

set -e

if [[ -v ADSB_DISABLED ]]; then
    echo "ADSB disabled. Sleeping."
    sleep infinity
fi

python dump1090pub.py -m mqtt -H dump1090 -r RTL -c
