#!/bin/sh

mkdir -p /data/www/admin/
mv /app/packages/frontend/dist/* /data/www/admin/

cd /app/packages/server

yarn run start