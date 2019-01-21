FROM resin/odroid-xu4-node

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna

ADD https://en.wikipedia.org/wiki/Wikipedia_logo#/media/File:Wikipedia-logo-v2.svg /dev/null

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app

WORKDIR /app

RUN yarn install --pure-lockfile

RUN yarn run build && \
    rm -rf /app/packages/server/public-vue && \
    mkdir -p /app/packages/server/dist/public-vue &&  \
    cp -a /app/packages/frontend/dist/* /app/packages/server/dist/public-vue && \
    rm -rf /app/packages/frontend

EXPOSE 3000
ENV NODE_ENV=production

CMD [ "yarn", "run", "start" ]
