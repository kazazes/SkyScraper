#!/bin/sh

rm -rf /data/www
mkdir -p /data/www/
mv /app/packages/frontend/dist/* /data/www/

cd /app/packages/server

yarn run start