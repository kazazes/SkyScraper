FROM resin/odroid-xu4-node

COPY keys/* /root/.ssh/

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

RUN npm i -g typescript lerna
RUN git clone git@github.com:kazazes/skyscraper-manager.git /app

WORKDIR /app

RUN yarn install --pure-lockfile &&\
  lerna bootstrap &&\
  cd /app/packages/prisma &&\
  tsc && \
  cd /app/packages/frontend && \
  yarn run build &&\
  cd /app/packages/backend && \
  yarn run build && \
  cd /app/packages/backend && \
  yarn run build && \
  cp -a /app/packages/frontend/dist /app/packages/backend/public-vue && \
  rm -rf /app/packages/frontend

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
