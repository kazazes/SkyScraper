#!/bin/sh

balena login --token NVPBU7madNgPKZhe1JsuDttQRvDykgO9

cd /workspace
balena deploy skyscraper-x86
