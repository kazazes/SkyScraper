#! /bin/bash

set -e
set -x

cp /data/conf/trunk-player/settings_local.py /trunk-player/trunk_player/

source /trunk-player/env/bin/activate
cd /trunk-player

./manage.py migrate

mkdir -p /data/web/static
rsync -a --delete /trunk-player/static /data/web/

daphne trunk_player.asgi:channel_layer --port 7055 --bind 0.0.0.0 &

./manage.py runworker
