#! /bin/bash

cp /data/conf/trunk-player.conf /etc/nginx/sites-enabled/trunk-player
systemctl reload nginx
