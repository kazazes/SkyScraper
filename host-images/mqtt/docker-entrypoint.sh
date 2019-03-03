#!/bin/bash

mkdir -p /data/mosquitto
mkdir -p /data/log/

touch /data/log/mosquitto.log
chown 1883:1883 /data/mosquitto/ -R
chmod o+w /data/log/mosquitto.log

tail -f /data/log/mosquitto.log &

/usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf
