#! /bin/bash

set -e

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)
HUB_NAMEPSACE=skyscraperai

build_arm() {
    cd $1
    docker pull $HUB_NAMEPSACE/$BASENAME:arm64
    docker build --rm --pull -f armhf.dockerfile -t $HUB_NAMEPSACE/$BASENAME:arm64 .
    cd $PROJECT_DIR
}

build_amd() {
    cd $1
    docker pull $HUB_NAMEPSACE/$BASENAME:amd64
    docker build --rm --pull -f amd64.dockerfile -t $HUB_NAMEPSACE/$BASENAME:amd64 .
    cd $PROJECT_DIR
}

create_manifest() {
    docker manifest create -a $HUB_NAMEPSACE/$BASENAME \
        $HUB_NAMEPSACE/$BASENAME:arm64 \
        $HUB_NAMEPSACE/$BASENAME:amd64
}

annotate_manifest() {
    docker manifest annotate $HUB_NAMEPSACE/$BASENAME $HUB_NAMEPSACE/$BASENAME:arm64 --arch arm64 --os linux
    docker manifest annotate $HUB_NAMEPSACE/$BASENAME $HUB_NAMEPSACE/$BASENAME:amd64 --arch amd64
}

echo -e "\nBuilding base images for amd and arm.\n"
for D in ./base-images/*; do
    if [[ -d "${D}" ]]; then
        BASENAME=$(basename ${D})
        build_arm ${D}
        build_amd ${D}
        create_manifest ${D}
        annotate_manifest ${D}
    fi
done
