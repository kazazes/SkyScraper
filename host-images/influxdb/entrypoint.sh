#!/bin/bash

set -e
set -x

mkdir -p /data/influxdb
chmod -R 777 /data/influxdb

if [ "${1:0:1}" = '-' ]; then
    set -- influxd "$@"
fi

if [ "$1" = 'influxd' ]; then
	/init-influxdb.sh "${@:2}"
fi

exec "$@"
