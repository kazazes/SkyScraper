#!/bin/sh

export DBUS_SYSTEM_BUS_ADDRESS=unix:path=/host/run/dbus/system_bus_socket

cd /app/data-router
ls -alh
pwd
yarn run start
