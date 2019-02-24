FROM balenalib/odroid-xu4-alpine-node as build

RUN apk add --no-cache \
	bash \
	openssh \
	git \
	socat

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna

COPY docker-entrypoint.sh /usr/local/bin

ENV CACHEBUST=8
ENV NODE_ENV=production

RUN apk add --no-cache --virtual .build-deps alpine-sdk python && \
    git clone git@github.com:kazazes/skyscraper-manager.git /app && \
    cd /app && \
    yarn install --pure-lockfile && \
    yarn run build && \
    apk del .build-deps

EXPOSE 3000

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
