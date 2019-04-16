#! /bin/bash

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

set -e

echo
echo ===
echo === If running on macOS, run
echo === brew install gnu-sed
echo ===


function generate_cloudbuild() {
    YAML=${PROJECT_DIR}/cloudbuild.yaml

    echo "steps:" > $YAML
    for D in ./host-images/*; do
		if [[ -d "${D}" ]]; then
		    BASENAME=$(basename ${D} | awk '{print tolower($0)}')
		    IMAGE_URI=gcr.io/methodical-tea-237508/skyscraperai/${BASENAME}:latest
		    IMAGES="'$IMAGE_URI', $IMAGES"
            echo -e "- name: 'gcr.io/cloud-builders/docker'" >> $YAML
            echo -e "  args: ['build', '--cache-from', '${IMAGE_URI}', '-t', '${IMAGE_URI}', '-f', '${D}/amd64.dockerfile', '${D}']" >> $YAML
            echo -e "  timeout: 600s" >> $YAML
#            echo -e "  waitFor: ['-']" >> $YAML
            echo -e "- name: 'gcr.io/cloud-builders/docker'" >> $YAML
            echo -e "  args: ['push', '${IMAGE_URI}']" >> $YAML
		fi
	done

#	echo -e "images: [$IMAGES]" >> $YAML
#
#	for D in ./base-images/*; do
#		if [[ -d "${D}" ]]; then
#
#		fi
#	done
}
generate_cloudbuild
