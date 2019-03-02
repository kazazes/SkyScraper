#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

# Make the default flows available in the user library
mkdir -p /data/node-red/user/lib/flows || true
cp /app/packages/server/src/node-red/flows/* /data/node-red/user/lib/flows/

cp -a /app/packages/frontend/dist/* /app/packages/server/public/
cd /app/packages/server
yarn run start
