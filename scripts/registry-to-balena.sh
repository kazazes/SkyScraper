#!/usr/bin/env bash

set -x

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

REGISTRY_SECRETS=registry-secrets.yml
sudo balena push --registry-secrets registry-secrets.yml skyscraper-x86

