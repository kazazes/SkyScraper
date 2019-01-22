#!/usr/bin/env bash

mkdir -p /data/www/
mv /app/packages/frontend/public-vue/* /data/www/admin/

cd /app/packages/server

yarn run start