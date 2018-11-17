#! /bin/bash

source /trunk-player/env/bin/activate
cd /trunk-player

./manage.py migrate

cp -a /trunk-player/static /data/web/static

daphne trunk_player.asgi:channel_layer --port 7055 --bind 127.0.0.1 &
./manage.py runworker
