#! /bin/bash

source /usr/local/setup_env.sh
source /skyscraper/src/trunk-player/env/bin/activate

wget https://www.nuand.com/fpga/hostedxA4-latest.rbf

cp /data/conf/trunk-player/settings_local.py /skyscraper/src/trunk-player/trunk_player/

arch=$(uname -i)
if  [[ $arch == armv7l ]]; then
  mkdir -p /root/.volk
  cp /data/conf/volk_config /root/.volk/volk_config
fi

bladeRF-cli -p
bladeRF-cli -l ./hostedxA4-latest.rbf

mkdir -p /data/audio

./recorder --config /data/sites/SF-PK/config.json
