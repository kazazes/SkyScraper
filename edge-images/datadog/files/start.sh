#!/bin/bash
if [ -z ${DATADOG_API_KEY+x} ]
then
  echo "ERROR: DATADOG_API_KEY IS NOT SET"
  exit 1
fi

if [ -z ${DD_HOSTNAME} ]
then
  export DD_HOSTNAME=$EDGE_HOSTNAME
fi

ln -sf /var/run/balena.sock /var/run/docker.sock

echo "api_key: $DATADOG_API_KEY" | cat - files/datadog.yaml > temp && mv temp files/datadog.yaml

./build/agent/agent -c files/datadog.yaml run
