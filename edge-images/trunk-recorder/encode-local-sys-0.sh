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
lame --preset voice $filename $mp3encoded

head -n-2 $json >$json.new
echo "\"duration\": $len," >>$json.new
echo "\"source\": 0," >>$json.new
echo "\"system\": \"$system\"," >>$json.new
echo "\"audioPath\": \"$mp3encoded\"," >>$json.new
echo "\"wavPath\": \"$basename.wav\"," >> $json.new
tail -n2 $json >>$json.new
mv $json.new $json

chmod -R 755 $json
chmod -R 755 $mp3encoded

mosquitto_pub -h $MQTT_HOST -f $json -t trunk-recorder/system/$system
