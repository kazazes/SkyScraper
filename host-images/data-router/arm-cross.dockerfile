FROM balenalib/odroid-xu4-alpine-node:6-edge-build as build
RUN ["cross-build-start"]

RUN apk add --no-cache \
  bash \
  openssh \
  git \
  alpine-sdk \
  python \
  g++ \
  gcc \
  libgcc \
  libstdc++ \
  linux-headers \
  make \
  python

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV CACHEBUST=23

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
  cd /app && \
  git checkout nuxt && \
  cd /app/data-router && \
  yarn install --pure-lockfile --network-timeout 180000 && \
  NODE_ENV=production yarn run build

EXPOSE 4000
EXPOSE 1888

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
RUN ["cross-build-end"]
