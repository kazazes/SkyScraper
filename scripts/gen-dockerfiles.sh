#! /bin/bash

PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

set -e

echo
echo ===
echo === If running on macOS, run
echo === brew install gnu-sed
echo ===

PROJECT_DIR=$(pwd)

generate_host_dockerfile() {
	echo "Host image: $(basename ${1})."
	cd $1
	cp Dockerfile.template amd64.dockerfile
	cp Dockerfile.template armhf.dockerfile

	sed -i -e 's/%%BALENA_MACHINE_NAME%%/intel-nuc/' \
		-e 's/gosu-armhf/gosu-amd64/' \
		-e 's/armhf.deb/amd64.deb/' \
		-e 's/tobi312\/rpi-nginx/nginx:stable-alpine/' \
		amd64.dockerfile

	sed -i -e 's/pckzs\/pybombs/pckzs\/pybombs-arm/' -e 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' -e 's/%%BALENA_ARCH%%/armv7h/' armhf.dockerfile

    cp armhf.dockerfile arm-cross.dockerfile
    sed -i -e '/FROM .*/a RUN ["cross-build-start"]' arm-cross.dockerfile
    echo 'RUN ["cross-build-end"]' >> arm-cross.dockerfile

	cd $PROJECT_DIR
}

function generate_base_dockerfile() {
	echo "Base image: $(basename $1)."
	cd $1
	cp Dockerfile.template amd64.dockerfile

	sed -i -e 's/balenalib\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
		-e 's/balenalib\/%%BALENA_MACHINE_NAME%%-//' \
		-e 's/RUN \[ "cross-build-start" \]//' \
		-e 's/RUN \[ "cross-build-end" \]//' \
		amd64.dockerfile

	sed 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' Dockerfile.template > armhf.dockerfile

	cd $PROJECT_DIR
}

function generate_compose() {
	cp docker-compose.yml docker-compose.amd.yml
	cp docker-compose.yml docker-compose.armhf.yml

	sed -i \
	    -e 's/#.*$//' -e 's/ *$//; /^$/d;' -e "s/\"resin-data:\/data/\".\/data:\/data/g" \
	    -e "s/build:/build:\n      dockerfile: amd64.dockerfile/g" -e "s/cpuset: \".*\"//" \
        -e 's/datadog:/datadog:\n    volumes:\n      - \/var\/run\/docker.sock:\/var\/run\/docker.sock\n      - \/run\/dbus:\/host\/run\/dbus\n      - \/proc\/:\/host\/proc\/\n      - \/sys\/fs\/cgroup\/:\/host\/sys\/fs\/cgroup\//' \
	    docker-compose.amd.yml
	sed -i -e 's/#.*$//' \
	    -e 's/ *$//; /^$/d;' -e "s/\"resin-data:\/data/\".\/data:\/data/g" -e "s/build:/build:\n      dockerfile: armhf.dockerfile/g" \
        -e 's/datadog:/datadog:\n    volumes:\n      - \/var\/run\/docker.sock:\/var\/run\/docker.sock\n      - \/run\/dbus:\/host\/run\/dbus\n      - \/proc\/:\/host\/proc\/\n      - \/sys\/fs\/cgroup\/:\/host\/sys\/fs\/cgroup\//' \
	    docker-compose.armhf.yml

    cp docker-compose.armhf.yml docker-compose.cross.yml
    sed -i -e 's/dockerfile: armhf.dockerfile/dockerfile: arm-cross.dockerfile/' docker-compose.cross.yml
}

if [ $# -eq 0 ]; then
	echo -e "\nGenerating Dockerfiles for amd and arm.\n"
	for D in ./host-images/*; do
		if [ -d "${D}" ]; then
			generate_host_dockerfile ${D}
		fi
	done

	for D in ./base-images/*; do
		if [ -d "${D}" ]; then
			generate_base_dockerfile ${D}
		fi
	done

	# echo 'CMD [ "nginx", "-g", "daemon off;" ]' >>./host-images/nginx/amd64.dockerfile
	generate_compose
else
	if [ -d "$1" ]; then
		case "$1" in
		*host-images/*)
			generate_host_dockerfile $1
			;;
		*base-image/*)
			generate_base_dockerfile $1
			;;
		esac
	fi
fi
