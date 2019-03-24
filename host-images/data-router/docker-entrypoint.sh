#!/bin/sh

cd /app/data-router
yarn run start

if [ -n "$DEBUG" ]; then
  echo "Application exited."
  while :; do
    echo "Idling..."
    sleep 600
  done
fi
