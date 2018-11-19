FROM resin/odroid-xu4-debian:stretch

ENV INITSYSTEM on

RUN apt-get update \
  && apt-get install nginx \
  && rm -f /etc/nginx/nginx.conf && ln -s /data/conf/nginx.conf /etc/nginx/nginx.conf \
  && ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 80

STOPSIGNAL SIGTERM
