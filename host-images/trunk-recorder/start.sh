#! /bin/bash

source /usr/local/setup_env.sh

arch=$(uname -i)
if [[ $arch == armv7l ]]; then
	mkdir -p /root/.volk
	cp /data/conf/volk_config /root/.volk/volk_config
fi

bladeRF-cli -p
bladeRF-cli -l /data/fpga/hostedxA4-latest.rbf

mkdir -p /data/audio

if [[ -z "${RECORDER_CONF}" ]]; then
	RECORDER_CONF=sites/SF-PK/config.json
fi

echo "Using container at path /data/${RECORDER_CONF}"
echo $(cat /data/${RECORDER_CONF})

./recorder --config /data/$RECORDER_CONF
