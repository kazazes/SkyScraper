#!/bin/sh

balena login --token $BALENA_TOKEN

cd /workspace
balena deploy skyscraper-x86
