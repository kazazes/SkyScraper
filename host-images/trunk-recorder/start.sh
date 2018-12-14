#! /bin/sh

. /usr/local/setup_env.sh

wget https://www.nuand.com/fpga/hostedxA4-latest.rbf

cp /data/conf/trunk-player/settings_local.py /skyscraper/src/trunk-player/trunk_player/

bladeRF-cli -p
bladeRF-cli -l ./hostedxA4-latest.rbf

mkdir -p /data/audio

./recorder --config /data/sites/SF-PK/config.json
