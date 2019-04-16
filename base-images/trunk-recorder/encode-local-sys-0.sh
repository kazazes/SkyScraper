#! /bin/bash

set -e

filename="$1"
basename="${filename%.*}"
filename_only=$(basename $basename)
mp3encoded="$basename.mp3"
json="$basename.json"
web_dir=$(dirname $filename | cut -d/ -f6-)"/"
system=${SHORTNAME}

# Hack the JSON to add play length and source
len=$(soxi -D $filename)

head -n-2 $json >$json.new
mv $json.new $json

lame --preset voice $filename $mp3encoded

chmod -R 755 $json
chmod -R 755 $mp3encoded

mosquitto_pub -h $MQTT_HOST -p $MQTT_PORT -t trunk-recorder/system/$system -f $json --capath /etc/ssl/certs/ \
    -u "$MQTT_USER" -P "$MQTT_PASSWORD"
