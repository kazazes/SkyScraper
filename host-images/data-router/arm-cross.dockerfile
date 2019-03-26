FROM balenalib/odroid-xu4-node:8-jessie-build as build
RUN ["cross-build-start"]

RUN apt update && apt install -y --no-install-recommends \
  openssh-client \
  git \
  build-essential \
  make \
  python \
  libzmq3-dev

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV CACHEBUST=ivzB93wWdco6RsMDKrGG5sNIOWoelc3q

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
  cd /app && \
  git checkout nuxt && \
  cd /app/data-router && \
  yarn install --pure-lockfile --network-timeout 180000 && \
  NODE_ENV=production yarn run build

EXPOSE 4000

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT "/usr/local/bin/docker-entrypoint.sh"
RUN ["cross-build-end"]
