#! /bin/bash

cp /data/conf/trunk-player/settings_local.py /skyscraper/src/trunk-player/trunk_player/

source /pybombs/setup_env.sh

bladeRF-cli -p
bladeRF-cli -l /usr/share/Nuand/bladeRF/hostedxA4.rbf

mkdir -p /data/audio
./recorder --config /data/sites/SF-SN/SF.json
