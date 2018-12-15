#! /bin/bash

set -e

echo -e "\nGenerating Dockerfiles for amd and arm.\n"

for D in ./host-images/*/; do
    if [ -d "${D}" ]; then
      echo "Host image: $(basename ${D})."

      sed -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      -e 's/gosu-armhf/gosu-amd64/' \
      ${D}Dockerfile.template > ${D}amd64.dockerfile

      sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ${D}Dockerfile.template > ${D}armhf.dockerfile
      sed 's/%%RESIN_ARCH%%/armv7h/' ${D}Dockerfile.template > ${D}armhf.dockerfile
    fi
done

for D in ./base-images/*/; do
    if [ -d "${D}" ]; then
      echo "Base image: $(basename ${D})."

      sed -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      -e 's/RUN \[ "cross-build-start" \]//' \
      -e 's/RUN \[ "cross-build-end" \]//' \
      ${D}Dockerfile.template > ${D}amd64.dockerfile

      sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ${D}Dockerfile.template > ${D}armhf.dockerfile
    fi
done

echo 'CMD [ "nginx" ]' >> ./host-images/nginx/amd64.dockerfile

cp ./docker-compose.yml docker-compose.amd.yml
sed -i "s/\"resin-data:\/data/\".\/data:\/data/" docker-compose.amd.yml
sed -i "s/build:/build:\n      dockerfile:  amd64.dockerfile/" docker-compose.amd.yml
