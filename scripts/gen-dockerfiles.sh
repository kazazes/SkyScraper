#! /bin/bash

set -e

echo
echo ===
echo === If running on macOS, run
echo === brew install gnu-sed
echo ===


if [ -f /usr/local/bin/sed  ]; then
  gsed=/usr/local/bin/sed
else
  gsed=$(which sed)
fi

echo -e "\nGenerating Dockerfiles for amd and arm.\n"

for D in ./host-images/*/; do
    if [ -d "${D}" ]; then
      echo "Host image: $(basename ${D})."

      cp ${D}Dockerfile.template ${D}amd64.dockerfile
      cp ${D}Dockerfile.template ${D}armhf.dockerfile

      gsed -i -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      -e 's/gosu-armhf/gosu-amd64/' \
      -e 's/rpi-v8/v8/' \
      -e 's/fg2it\/grafana-armhf:v5.1.4/grafana\/grafana:5.1.5/' \
      -e 's/tobi312\/rpi-nginx/nginx/' \
      -e 's/arm32v7\/telegraf:1.8.2/telegraf:1.8-alpine/' \
      -e 's/arm32v7\/influxdb:latest/influxdb:alpine/' \
      ${D}amd64.dockerfile

      gsed -i -e 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' -e 's/%%RESIN_ARCH%%/armv7h/' ${D}armhf.dockerfile
    fi
done

for D in ./base-images/*/; do
    if [ -d "${D}" ]; then
      echo "Base image: $(basename ${D})."

      cp ${D}Dockerfile.template ${D}amd64.dockerfile

      gsed -i -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      -e 's/RUN \[ "cross-build-start" \]//' \
      -e 's/RUN \[ "cross-build-end" \]//' \
      ${D}amd64.dockerfile

      gsed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ${D}Dockerfile.template > ${D}armhf.dockerfile
    fi
done

echo 'CMD [ "nginx" ]' >> ./host-images/nginx/amd64.dockerfile

cp docker-compose.yml docker-compose.amd.yml
gsed -i -e "s/\"resin-data:\/data/\".\/data:\/data/g" -e "s/build:/build:\n      dockerfile:  amd64.dockerfile/g" docker-compose.amd.yml
