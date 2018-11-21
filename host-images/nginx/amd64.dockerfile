FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
ENV INITSYSTEM on

RUN apt-get update \
  && apt-get -y install nginx \
  && rm -f /etc/nginx/sites-enabled/default \
  && rm -rf /var/lib/apt/lists/*

COPY ./trunk-player.conf /etc/nginx/sites-enabled/trunk-player

EXPOSE 80

STOPSIGNAL SIGTERM
