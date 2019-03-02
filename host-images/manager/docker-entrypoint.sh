#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

mkdir -p /data/www/
rm -rf /data/www/*
cp -r /app/packages/frontend/dist/* /data/www/
touch /data/log/mosquitto.log
chmod -R 777 /data/logs
chown $(whoami):$(whoami) /data/log/mosquitto.log

cd /app/packages/server/
yarn run start
