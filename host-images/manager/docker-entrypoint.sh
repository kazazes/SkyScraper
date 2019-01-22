#!/bin/sh

cp -a /app/packages/frontend/dist/* /app/packages/server/public/
cd /app/packages/server
yarn run start