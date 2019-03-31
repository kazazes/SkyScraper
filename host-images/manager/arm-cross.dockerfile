FROM balenalib/odroid-xu4-alpine-node:10-edge-build as build
RUN ["cross-build-start"]

RUN apk add --no-cache \
  bash \
  openssh \
  git \
  socat \
  python \
  && rm -rf /var/cache/apk/*

ENV SASS_BINARY_PATH=/usr/lib/node_modules/node-sass/build/Release/binding.node

RUN apk add --virtual .build-deps g++ gcc libgcc libstdc++ linux-headers make python && \
  git clone https://github.com/sass/sassc && cd sassc && \
  git clone https://github.com/sass/libsass && \
  SASS_LIBSASS_PATH=/sassc/libsass make -j8 && \
  mv bin/sassc /usr/bin/sassc && \
  cd ../ && rm -rf /sassc && cd / && \
  git clone --recursive https://github.com/sass/node-sass.git && \
  cd node-sass && \
  git submodule update --init --recursive && \
  npm install && \
  node scripts/build -f && \
  cd ../ && rm -rf node-sass && \
  rm -rf /var/cache/apk/* && \
  apk del .build-deps

# add binary path of node-sass to .npmrc
RUN touch $HOME/.npmrc && echo "sass_binary_cache=${SASS_BINARY_PATH}" >> $HOME/.npmrc

ENV SKIP_SASS_BINARY_DOWNLOAD_FOR_CI true
ENV SKIP_NODE_SASS_TESTS true
RUN touch $HOME/.npmrc && echo "sass_binary_cache=${SASS_BINARY_PATH}" >> $HOME/.npmrc

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV CACHEBUST=pjNmWYQh7iZhQxv62fstc63CJcr2hVNP

RUN apk add --no-cache --virtual .build-deps alpine-sdk python && \
  git clone git@github.com:kazazes/skyscraper-manager.git /app && \
  cd /app && \
  git checkout nuxt && \
  cd /app/frontend && \
  yarn install --pure-lockfile --network-timeout 180000 && \
  NODE_ENV=production yarn run build

EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
RUN ["cross-build-end"]
