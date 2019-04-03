#! /bin/bash

set -e

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)
HUB_NAMEPSACE=skyscraperai

docker_build() {
    cd $1
    ARCH=$2
    echo -e "Building $HUB_NAMEPSACE/$BASENAME:$ARCH\n\n"
    docker build --pull -f $ARCH.dockerfile -t $HUB_NAMEPSACE/$BASENAME:$ARCH .
    docker push $HUB_NAMEPSACE/$BASENAME:$ARCH
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

push_manifest() {
    docker manifest push $HUB_NAMEPSACE/$BASENAME
    docker push $HUB_NAMEPSACE/$BASENAME
}

echo -e "\nBuilding base images for amd and arm.\n"



if [[ $# -eq 0 ]]; then
    for D in ./base-images/*; do
        if [[ -d "${D}" ]]; then
            BASENAME=$(basename ${D})
            docker_build ${D} arm64
            docker_build ${D} amd64
            create_manifest
            annotate_manifest
            push_manifest
        fi
    done
else
		    D=./base-images/$1
			BASENAME=$(basename ${D})
#            docker_build ${D} arm64
            docker_build ${D} amd64
            create_manifest ${D}
            annotate_manifest ${D}
            push_manifest ${D}
fi
