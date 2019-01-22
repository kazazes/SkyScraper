FROM resin/odroid-xu4-node

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna

COPY docker-entrypoint.sh /usr/local/bin

ADD https://en.wikipedia.org/wiki/Wikipedia_logo#/media/File:Wikipedia-logo-v2.svg /dev/null

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
    cd /app && \
    yarn install --pure-lockfile

RUN cd /app && yarn run build

EXPOSE 3000
ENV NODE_ENV=production

CMD ['docker-entrypoint.sh']