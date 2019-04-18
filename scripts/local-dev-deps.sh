#!/bin/bash

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

docker-compose -f docker-compose.amd.yml up -d --build nginx manager nodered netdata datarouter datadog
