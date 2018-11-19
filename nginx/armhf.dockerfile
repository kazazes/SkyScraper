FROM resin/odroid-xu4-debian:stretch

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
  && apt-get -y install nginx \
  && rm -f /etc/nginx/sites-enabled/default \
  && rm -rf /var/lib/apt/lists/*

COPY ./trunk-player.conf /etc/nginx/sites-enabled/trunk-player
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 80

STOPSIGNAL SIGTERM
ENV INITSYSTEM on

ENTRYPOINT [ "/usr/local/bin/docker-entrypoint.sh" ]
