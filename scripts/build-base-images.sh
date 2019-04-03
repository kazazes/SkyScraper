#! /bin/bash

set -e

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)
HUB_NAMEPSACE=skyscraperai

docker_build() {
    cd $1
    ARCH=$2
    echo "Building $HUB_NAMEPSACE/$BASENAME:$ARCH"
    docker build --rm --pull --cache-from $HUB_NAMEPSACE/$BASENAME:$ARCH -f $ARCH.dockerfile -t $HUB_NAMEPSACE/$BASENAME:$ARCH .
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
        docker_build ${D} arm64
        docker_build ${D} amd64
        create_manifest ${D}
        annotate_manifest ${D}
    fi
done
