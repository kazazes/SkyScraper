#! /bin/bash

# Generate platform-specific dockerfiles from dockerfile.template files.

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

set -ex

echo
echo ===
echo === If running on macOS, run
echo === brew install gnu-sed
echo ===

generate_host_dockerfile() {
    echo "Edge image: $(basename ${1})."
    cd $1
    cp Dockerfile.template Dockerfile
    cp Dockerfile.template arm64.dockerfile

    # x86 compose file
    sed -i -e 's/%%BALENA_MACHINE_NAME%%/intel-nuc/' \
        -e 's/gosu-armhf/gosu-amd64/' \
        -e 's/armhf.deb/amd64.deb/' \
        -e 's/tobi312\/rpi-nginx/nginx:stable-alpine/' \
        Dockerfile

    # armhf compose file
    sed -i -e 's/pckzs\/pybombs/pckzs\/pybombs-arm/' -e 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' -e 's/%%BALENA_ARCH%%/armv7h/' arm64.dockerfile

    cd $PROJECT_DIR
}

generate_base_dockerfile() {
    echo "Base image: $(basename $1)."
    cd $1
    cp Dockerfile.template Dockerfile
    cp Dockerfile.template arm64.dockerfile

    sed -i -e 's/balenalib\/%%BALENA_MACHINE_NAME%%-buildpack-deps/debian/' \
        -e 's/balenalib\/%%BALENA_MACHINE_NAME%%-//' \
        -e 's/RUN \[ "cross-build-start" \]//' \
        -e 's/RUN \[ "cross-build-end" \]//' \
        Dockerfile

    sed -i -e 's/%%BALENA_MACHINE_NAME%%/odroid-xu4/' \
        -e 's/skyscraperai\/sdr-ubuntu/skyscraperai\/sdr-ubuntu:arm64/' \
        -e 's/ENV ARCH=amd64/ENV ARCH=arm64/' \
        -e 's/ARG ARCH=amd64/ARG ARCH=arm64/' \
        -e 's/ARG ARCH_ALIAS=amd64/ARG ARCH_ALIAS=armhf/' \
        arm64.dockerfile

    cd $PROJECT_DIR
}

generate_dev_compose() {
    cd $PROJECT_DIR/edge-images
    cp docker-compose.yml docker-compose.dev.yml
    sed -i -e 's/resin-data:\/data/.\/data\/:\/data/' docker-compose.dev.yml
    sed -i -e 's/\data\/:\/data/\data\/:\/data"\n      - "\/var\/run\/docker.sock:\/var\/run\/balena.sock/' docker-compose.dev.yml
}

if [[ $# -eq 0 ]]; then
    echo -e "\nGenerating Dockerfiles for amd and arm.\n"
    for D in ./edge-images/*; do
        if [[ -d "${D}" ]]; then
            generate_host_dockerfile ${D}
        fi
    done

    for D in ./base-images/*; do
        if [[ -d "${D}" ]]; then
            generate_base_dockerfile ${D}
        fi
    done

    generate_dev_compose
else
    if [[ -d "$1" ]]; then
        case "$1" in
        *edge-images/*)
            generate_host_dockerfile $1
            ;;
        *base-image/*)
            generate_base_dockerfile $1
            ;;
        esac
    fi
fi
