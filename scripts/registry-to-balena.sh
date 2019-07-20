#!/usr/bin/env bash

REGISTRY_SECRETS=registry-secrets.yml

set -x

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

balena deploy --registry-secrets $REGISTRY_SECRETS skyscraper-x86
