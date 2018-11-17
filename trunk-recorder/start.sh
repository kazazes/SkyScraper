#! /bin/bash

source /pybombs/setup_env.sh

bladeRF-cli -p
bladeRF-cli -l /usr/share/Nuand/bladeRF/hostedxA4.rbf

./recorder --config /data/sites/SF-SN/SF.json
