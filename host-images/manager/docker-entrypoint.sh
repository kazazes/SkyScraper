#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

cd /app/frontend
NODE_ENV=production yarn run start
