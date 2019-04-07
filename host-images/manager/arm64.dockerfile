FROM balenalib/odroid-xu4-node:10-build as build

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV CACHEBUST=yyhlnnz4ff5odf2gcuKRkazyi4SlKvh0

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
  cd /app && \
  cd /app/frontend && \
  yarn install --pure-lockfile --network-timeout 180000 && \
  NODE_ENV=production yarn run build


FROM balenalib/odroid-xu4-alpine-node:10-edge-run
EXPOSE 3000

COPY --from=build /app/frontend /app/frontend
COPY docker-entrypoint.sh /usr/local/bin

RUN yarn

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
