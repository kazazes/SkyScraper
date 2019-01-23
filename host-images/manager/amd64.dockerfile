FROM node:11

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna

COPY docker-entrypoint.sh /usr/local/bin

ENV CACHEBUST=1

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
    cd /app && \
    yarn install --pure-lockfile

RUN cd /app && yarn run build

EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'