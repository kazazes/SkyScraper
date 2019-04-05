#!/bin/bash

set -e
set -x

if [ -v LTE_DISABLED ]; then
  echo "LTE disabled. Sleeping."
  sleep infinity
fi

srsenb --log.all_level debug
