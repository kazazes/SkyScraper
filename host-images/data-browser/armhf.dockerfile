FROM resin/odroid-xu4-alpine:3.7

RUN apk add python

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT [ "docker-entrypoint.sh" ]
