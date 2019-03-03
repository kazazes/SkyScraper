FROM balenalib/odroid-xu4-alpine
RUN ["cross-build-start"]

RUN echo "@edge http://nl.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
  apk update && \
  apk add libpq postgresql-client postgresql postgresql-contrib curl && \
  mkdir /docker-entrypoint-initdb.d && \
  curl -o /usr/local/bin/gosu -sSL "https://github.com/tianon/gosu/releases/download/1.2/gosu-armhf" && \
  chmod +x /usr/local/bin/gosu && \
  apk del curl && \
  rm -rf /var/cache/apk/* && \
  mkdir -p /run/postgresql && \
  chown -R postgres:postgres /run/postgresql

ENV LANG en_US.utf8

COPY docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 5432
RUN ["cross-build-end"]
