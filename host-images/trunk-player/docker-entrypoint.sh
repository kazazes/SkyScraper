#! /bin/sh

set -e

cp /data/conf/trunk-player/settings_local.py /trunk-player/trunk_player/

source /trunk-player/env/bin/activate
cd /trunk-player

./manage.py migrate
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'peter@peterk.co', 'scrapingskies')" | python manage.py shell

mkdir -p /data/web/static
rsync -a --delete /trunk-player/static /data/web/

daphne trunk_player.asgi:channel_layer --port 7055 --bind 0.0.0.0 &

./manage.py runworker
