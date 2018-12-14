#! /bin/sh

. /usr/local/setup_env.sh

cp /data/conf/trunk-player/settings_local.py /skyscraper/src/trunk-player/trunk_player/

bladeRF-cli -p
bladeRF-cli -l /usr/share/Nuand/bladeRF/hostedxA4.rbf

mkdir -p /data/audio

if [[ -z "${RECORDER_CONF}" ]]; then
  RECORDER_CONF=sites/SF-PK/config.json
fi

echo "Using container at path /data/${RECORDER_CONF}"
echo $(cat /data/${RECORDER_CONF})

./recorder --config /data/$RECORDER_CONF
