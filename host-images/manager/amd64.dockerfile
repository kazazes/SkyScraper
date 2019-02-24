FROM node:latest as build

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna

COPY docker-entrypoint.sh /usr/local/bin

ENV CACHEBUST=8

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
    cd /app && \
    yarn install --pure-lockfile && \
    yarn run build

ENV NODE_ENV=production

RUN yarn

EXPOSE 3000

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
