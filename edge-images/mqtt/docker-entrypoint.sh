#!/bin/bash

mkdir -p /data/mosquitto
mkdir -p /data/log/

touch /data/log/mosquitto.log
chown mosquitto:mosquitto -R /data/mosquitto/
chmod 0666 /data/mosquitto

tail -f /data/log/mosquitto.log &

/usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf
