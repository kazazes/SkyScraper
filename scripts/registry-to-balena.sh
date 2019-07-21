#!/usr/bin/env bash

set -x

cd "$(dirname "$0")"/..
PROJECT_DIR=$(pwd)

balena deploy skyscraper-x86
