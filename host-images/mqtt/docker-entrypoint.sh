#!/bin/bash

mkdir -p /data/mosquitto
mkdir -p /data/log

/usr/sbin/mosquitto -c /mosquitto/config/mosquitto.conf
