#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

cd /app/packages/server/
yarn run start
