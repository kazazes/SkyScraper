#! /bin/bash

# Config
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./config/Dockerfile.template > ./config/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./config/Dockerfile.template > ./config/armhf.dockerfile

# Trunk Recorder
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./trunk-recorder/Dockerfile.template > ./trunk-recorder/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./trunk-recorder/Dockerfile.template > ./trunk-recorder/armhf.dockerfile

# Trunk Player
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./trunk-player/Dockerfile.template > ./trunk-player/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./trunk-player/Dockerfile.template > ./trunk-player/armhf.dockerfile

# Redis
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./redis/Dockerfile.template > ./redis/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./redis/Dockerfile.template > ./redis/armhf.dockerfile

# Postgres
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./postgres/Dockerfile.template > ./postgres/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./postgres/Dockerfile.template > ./postgres/armhf.dockerfile

# Nginx
sed 's/resin\/%%BALENA_MACHINE_NAME%%-//' ./nginx/Dockerfile.template > ./nginx/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./nginx/Dockerfile.template > ./nginx/armhf.dockerfile

# Pybombs minimal
sed 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' ./pybombs-minimal/Dockerfile.template > ./pybombs-minimal/amd64.dockerfile
sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ./pybombs-minimal/Dockerfile.template > ./pybombs-minimal/armhf.dockerfile
