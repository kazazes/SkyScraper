#! /bin/bash

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

set -e

function generate_cloudbuild() {
    YAML=${PROJECT_DIR}/cloudbuild.yaml

    echo "steps:" > $YAML
    echo -e "- name: 'gcr.io/\$PROJECT_ID/slackbot'" >> $YAML
    echo -e "  args: [ '--build', '\$BUILD_ID'," >> $YAML
    echo -e "  '--webhook', 'https://hooks.slack.com/services/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' ]" >> $YAML
    for D in ./host-images/*; do
		if [[ -d "${D}" ]]; then
		    BASENAME=$(basename ${D} | awk '{print tolower($0)}')
		    IMAGE_URI=gcr.io/methodical-tea-237508/skyscraperai/${BASENAME}:latest
		    IMAGES="'$IMAGE_URI', $IMAGES"
		    echo -e "- name: 'gcr.io/cloud-builders/docker'" >> $YAML
            echo -e "  waitFor: ['-']" >> $YAML
            echo -e "  entrypoint: 'bash'" >> $YAML
            echo -e "  args:" >> $YAML
            echo -e "  - '-c'" >> $YAML
            echo -e "  - |" >> $YAML
            echo -e "    docker pull ${IMAGE_URI} || exit 0" >> $YAML
            echo -e "- name: 'gcr.io/cloud-builders/docker'" >> $YAML
            echo -e "  args: ['build', '--cache-from', '${IMAGE_URI}', '-t', '${IMAGE_URI}', '-f', '${D}/amd64.dockerfile', '${D}']" >> $YAML
            echo -e "  timeout: 1200s" >> $YAML
            echo -e "- name: 'gcr.io/cloud-builders/docker'" >> $YAML
            echo -e "  args: ['push', '${IMAGE_URI}']" >> $YAML
		fi
	done

    echo -e "timeout: 3600s" >> $YAML
	echo -e "images: [$IMAGES]" >> $YAML
}
generate_cloudbuild
