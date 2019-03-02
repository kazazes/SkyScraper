#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

mkdir -p /data/www/
cp -a /app/packages/frontend/dist/ /data/www/manager/

cd /app/packages/server/
yarn run start
