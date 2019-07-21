#!/bin/sh

balena login --token $BALENA_TOKEN

cd /app
balena deploy skyscraper-x86
