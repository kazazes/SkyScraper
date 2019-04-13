#! /bin/bash

set -e

if [[ -v ADSB_DISABLED ]]; then
    echo "ADSB disabled. Sleeping."
    sleep 99999d
fi

python dump1090pub.py -m ${MQTT_HOST:-127.0.0.1} -H ${DUMP1090_HOST:-127.0.0.1} -r RTL -c
