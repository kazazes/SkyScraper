#! /bin/bash
# Sample file for loading local files into trunk-player
# Dylan Reinhold 03/10/2017
# Project https://github.com/ScanOC/trunk-player
#-------------------------------------------------------

set -e
set -x

echo "Encoding: $1"
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
echo "\"duration\": $len," >>$json.new
echo "\"source\": 0," >>$json.new
echo "\"system\": \"$system\"," >>$json.new
echo "\"audioPath\": \"$mp3encoded\"," >>$json.new
tail -n2 $json >>$json.new
mv $json.new $json

lame --preset voice $filename $mp3encoded

mosquitto_pub -h $MQTT_HOST -f $json -t trunk-recorder/system/$system
