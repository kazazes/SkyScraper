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


# cat <<EOT > ./host-images/postgres/amd64.dockerfile
# FROM postgres

# ENV LANG en_US.utf8

# COPY docker-entrypoint.sh /usr/local/bin
# RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ENTRYPOINT ["docker-entrypoint.sh"]

# EXPOSE 5432
# CMD ["postgres"]
# EOT

echo 'CMD [ "nginx" ]' >> ./host-images/nginx/amd64.dockerfile
