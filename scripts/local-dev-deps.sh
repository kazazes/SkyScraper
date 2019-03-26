#!/bin/bash

docker-compose -f docker-compose.amd.yml up --build nginx manager nodered netdata datarouter
