#!/bin/bash

set -e
PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

./scripts/gen-dockerfiles.sh >/dev/null
echo -e "Regenerated dockerfiles."

echo -e "===\n=== If running on macOS, run\n=== brew install gnu-sed\n==="

rm -rf ./Dockerfiles/*
mkdir -p ./Dockerfiles/x86
mkdir -p ./Dockerfiles/ARM

function copy_x86() {
    OUT_PATH=./Dockerfiles/x86/$(basename ${1})
    echo Generated x86 $(basename ${1}) at ${OUT_PATH}
    mkdir -p $OUT_PATH
    cp -a ${1}/* $OUT_PATH
    mv $OUT_PATH/amd64.dockerfile $OUT_PATH/Dockerfile
    rm $OUT_PATH/Dockerfile.template $OUT_PATH/armhf.dockerfile
}

function copy_ARM() {
    OUT_PATH=./Dockerfiles/ARM/$(basename ${1})
    echo Generated x86 $(basename ${1}) at ${OUT_PATH}
    mkdir -p $OUT_PATH
    cp -a ${1}/* $OUT_PATH
    mv $OUT_PATH/armhf.dockerfile $OUT_PATH/Dockerfile
    rm $OUT_PATH/Dockerfile.template $OUT_PATH/amd64.dockerfile
}

for D in ./host-images/*; do
    if [ -d "${D}" ]; then
        copy_x86 ${D}
        copy_ARM ${D}
    fi
done

for D in ./base-images/*; do
    if [ -d "${D}" ]; then
        copy_x86 ${D}
        copy_ARM ${D}
    fi
done

cp docker-compose.amd.yml Dockerfiles/x86/docker-compose.yml
cp docker-compose.armhf.yml Dockerfiles/ARM/docker-compose.yml
