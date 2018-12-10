#! /bin/bash

set -e

cd ..
echo -e "\nGenerating Dockerfiles for amd and arm.\n"

for D in ./host-images/*/; do
    if [ -d "${D}" ]; then
      echo "Host image: $(basename ${D})."

      sed -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      ${D}Dockerfile.template > ${D}amd64.dockerfile

      sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ${D}Dockerfile.template > ${D}armhf.dockerfile
    fi
done

for D in ./base-images/*/; do
    if [ -d "${D}" ]; then
      echo "Base image: $(basename ${D})."

      sed -e 's/resin\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
      -e 's/resin\/%%BALENA_MACHINE_NAME%%-//' \
      ${D}Dockerfile.template > ${D}amd64.dockerfile

      sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' ${D}Dockerfile.template > ${D}armhf.dockerfile
    fi
done
