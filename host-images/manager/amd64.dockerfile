FROM balenalib/intel-nuc-node:10-build as build

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV CACHEBUST=xi5IsfV7d6m0S8vWBOMum1FFfpHeSwVd

RUN git clone git@github.com:kazazes/skyscraper-manager.git /app && \
  cd /app && \
  cd /app/frontend && \
  yarn install --pure-lockfile --network-timeout 180000 && \
  NODE_ENV=production yarn run build


FROM balenalib/intel-nuc-alpine-node:10-edge-run
EXPOSE 3000

COPY --from=build /app/frontend /app/frontend
COPY docker-entrypoint.sh /usr/local/bin

RUN yarn

ENTRYPOINT '/usr/local/bin/docker-entrypoint.sh'
