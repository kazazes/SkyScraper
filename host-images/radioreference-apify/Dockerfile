FROM apify/actor-node-chrome

USER root
RUN apt-get update \
   && apt-get install -y --no-install-recommends curl ca-certificates \
   && rm -rf /var/apt/lists*

ENV YARN_VERSION 1.17.3

RUN set -ex \
   && for key in \
   6A010C5166006599AA17F08146C2130DFD2497F5 \
   ; do \
   gpg --batch --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys "$key" || \
   gpg --batch --keyserver hkp://ipv4.pool.sks-keyservers.net --recv-keys "$key" || \
   gpg --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "$key" ; \
   done \
   && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
   && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
   && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
   && mkdir -p /opt \
   && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
   && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
   && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
   && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz

WORKDIR /usr/local/app

RUN chown -R myuser:myuser /usr/local/app

USER myuser
ENV NODE_ENV=

COPY --chown=myuser:myuser package.json yarn.lock ./

RUN yarn global add typescript \
   && yarn install

COPY --chown=myuser:myuser . .

RUN yarn build

CMD ["yarn", "start"]
