FROM resin/odroid-xu4-debian:stretch

ENV INITSYSTEM on

RUN apt-get update \
  && apt-get install nginx \
  && rm -f /etc/nginx/sites-enabled/default && ln -s /data/conf/trunk-player.conf /etc/nginx/sites-enabled/trunk-player \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 80

STOPSIGNAL SIGTERM
