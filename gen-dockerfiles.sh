#! /bin/bash

# Config
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./config/Dockerfile.template > ./generated/config-amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./config/Dockerfile.template > ./generated/config-armhf.dockerfile

# Trunk Recorder
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./trunk-recorder/Dockerfile.template > ./generated/trunk-recorder-amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./trunk-recorder/Dockerfile.template > ./generated/trunk-recorder-armhf.dockerfile
