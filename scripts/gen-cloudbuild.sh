#! /bin/bash

cd "$(dirname "$0")"/..

set -e

CACHE_TTL=48h

PROJECT_DIR=$(pwd)
PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH
# IN_USE=$(cat ../docker-compose.yml && sed -e 's/[^  ](?:  )([\w\-]+)(?::\n)//g')

function generate_cloudbuild() {
    YAML=${PROJECT_DIR}/cloudbuild.yaml

    echo "steps:" >$YAML
    echo -e "- name: 'gcr.io/\$PROJECT_ID/slackbot'" >>$YAML
    echo -e "  args: [ '--build', '\$BUILD_ID'," >>$YAML
    echo -e "  '--webhook', 'https://hooks.slack.com/services/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' ]" >>$YAML
    for D in ./edge-images/*; do
        if [[ -d "${D}" ]]; then
            BASENAME=$(basename ${D} | awk '{print tolower($0)}')
            IMAGE_URI=gcr.io/methodical-tea-237508/skyscraperai/${BASENAME}:latest
            IMAGES="'$IMAGE_URI', $IMAGES"

            echo -e "- name: 'gcr.io/kaniko-project/executor:latest'" >>$YAML
            echo -e "  args: ['--cache=true', '--cache-ttl=${CACHE_TTL}', '--destination=${IMAGE_URI}', '--context=dir://workspace/${D}', '--dockerfile=/workspace/${D}/Dockerfile']" >>$YAML
            echo -e "  timeout: 3600s" >>$YAML
            # echo -e "  waitFor: ['-']" >>$YAML
        fi
    done

    # for D in ./host-images/*; do
    #     if [[ -d "${D}" ]]; then
    #         BASENAME=$(basename ${D} | awk '{print tolower($0)}')
    #         IMAGE_URI=gcr.io/methodical-tea-237508/skyscraperai/${BASENAME}:latest
    #         IMAGES="'$IMAGE_URI', $IMAGES"

    #         echo -e "- name: 'gcr.io/kaniko-project/executor:latest'" >>$YAML
    #         echo -e "  args: ['--cache=true', '--cache-ttl=${CACHE_TTL}', '--destination=${IMAGE_URI}', '--context=dir://workspace/${D}', '--dockerfile=/workspace/${D}/Dockerfile']" >>$YAML
    #         echo -e "  timeout: 3600s" >>$YAML
    #         echo -e "  waitFor: ['-']" >>$YAML
    #     fi
    # done
}
generate_cloudbuild
