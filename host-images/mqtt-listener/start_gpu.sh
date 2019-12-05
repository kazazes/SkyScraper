#! /bin/bash

sudo nvidia-persistenced

export MODELSERVER_IMAGE=quay.io/assemblyai-onprem/model-server:3.0.1_default_gpu

docker-compose -f docker-compose.yml up -d
