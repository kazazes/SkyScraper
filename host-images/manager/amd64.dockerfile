FROM node:9 as vue

WORKDIR /app/frontend

COPY packages/frontend/package.json .
COPY packages/frontend/yarn.lock .
RUN yarn install --pure-lockfile
COPY packages/frontend/ ./
RUN yarn run build

WORKDIR /app/backend

COPY packages/backend/package.json .
COPY packages/backend/yarn.lock .
RUN yarn install --pure-lockfile
COPY packages/backend/ ./
RUN yarn run build && cp -a /app/frontend /app/public-vue

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
