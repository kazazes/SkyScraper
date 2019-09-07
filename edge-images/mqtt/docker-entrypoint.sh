#!/bin/bash

mkdir -p /data/mosquitto
mkdir -p /data/log/

touch /data/log/mosquitto.log
chown mosquitto:mosquitto -R /data/mosquitto/
chmod 0666 /data/mosquitto

cat >/mosquitto/config/mosquitto.conf <<EOL
connection cloud
address mqtt.skyscraper.ai
remote_username edge
remote_password Ur6yANnx@ZD
topic # both 1 "" ${BALENA_DEVICE_UUID}/
log_dest stdout
connection_messages true

EOL

tail -f /data/log/mosquitto.log &

/usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf
