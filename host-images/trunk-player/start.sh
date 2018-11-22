#! /bin/bash

source /trunk-player/env/bin/activate
rm -rf /data/trunk-player
cp -a /trunk-player /data
cd /trunk-player

./manage.py migrate

mkdir -p /data/web/static
cp -a /trunk-player/static /data/web/static

daphne trunk_player.asgi:channel_layer --port 7055 --bind 0.0.0.0 &

./manage.py runworker
