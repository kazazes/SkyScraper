#! /bin/bash

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

PATH=/usr/local/opt/gnu-sed/libexec/gnubin/:$PATH

set -e

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
            echo -e "  args: ['--cache=true', '--cache-ttl=12h', '--destination=${IMAGE_URI}', '--context=dir://workspace/${D}', '--dockerfile=/workspace/${D}/amd64.dockerfile']" >>$YAML
            echo -e "  timeout: 1200s" >>$YAML
            echo -e "  waitFor: ['-']" >>$YAML
        fi
    done

    for D in ./host-images/*; do
        if [[ -d "${D}" ]]; then
            BASENAME=$(basename ${D} | awk '{print tolower($0)}')
            IMAGE_URI=gcr.io/methodical-tea-237508/skyscraperai/${BASENAME}:latest
            IMAGES="'$IMAGE_URI', $IMAGES"

            echo -e "- name: 'gcr.io/kaniko-project/executor:latest'" >>$YAML
            echo -e "  args: ['--cache=true', '--cache-ttl=72h', '--destination=${IMAGE_URI}', '--context=dir://workspace/${D}', '--dockerfile=/workspace/${D}/Dockerfile']" >>$YAML
            echo -e "  timeout: 1200s" >>$YAML
            echo -e "  waitFor: ['-']" >>$YAML
        fi
    done

    echo -e "- name: 'gcr.io/methodical-tea-237508/skyscraperai/gc-to-balena:latest'" >>$YAML
    echo -e "  secretEnv: ['BALENA_TOKEN']" >>$YAML
    echo -e "secrets:" >>$YAML
    echo -e "  - kmsKeyName: projects/methodical-tea-237508/locations/global/keyRings/balena" >>$YAML
    echo -e "    secretEnv: " >>$YAML
    echo -e "      BALENA_TOKEN: CiQAgf4uFlkkIt5DY1vPXcBMMbWbyI4Ogs58EEbRvcLETuZWNQwSSQC9/m0lMwfdWc/MRdcxEJ4fVE+NpiTwfVL26dCBIbiomj77F/jpdcpxIcbXTl9S3x5AUKA05uNNMQiqFa5mYsytbz3LOPzVEec=" >>$YAML

    echo -e "timeout: 3600s" >>$YAML
}
generate_cloudbuild
