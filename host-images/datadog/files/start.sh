#!/bin/bash
if [ -z ${DATADOG_API_KEY+x} ]
then
  echo "ERROR: DATADOG_API_KEY IS NOT SET"
  exit 1
fi


if [ -v BALENA ]; then
    ln -sf /var/run/balena.sock /var/run/docker.sock
fi

echo "api_key: $DATADOG_API_KEY" | cat - files/datadog.yaml > temp && mv temp files/datadog.yaml

./build/agent/agent -c files/datadog.yaml run
