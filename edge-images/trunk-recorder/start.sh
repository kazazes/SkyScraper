#! /bin/bash

set -e
set -x

if [ -v TR_DISABLED ]; then
    echo "Trunk recorder disabled. Sleeping."
    sleep infinity
fi

arch=$(uname -i)
if [[ $arch == armv7l ]]; then
	mkdir -p /root/.volk
	cp ${VOLK_CONFIG:=/data/conf/volk_config} /root/.volk/volk_config
fi

bladeRF-cli -p
bladeRF-cli -l /data/fpga/hostedxA4-latest.rbf

mkdir -p /data/audio

if [[ -z "${RECORDER_CONF}" ]]; then
	RECORDER_CONF=sites/SF-PK/config.json
fi

echo "Using configuration at path /data/${RECORDER_CONF}"
echo $(cat /data/${RECORDER_CONF} | python -m json.tool)

./recorder --config /data/$RECORDER_CONF
