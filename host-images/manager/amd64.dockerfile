FROM node:11.6.0 as vue

WORKDIR /app

COPY packages/frontend/package.json .
COPY packages/frontend/yarn.lock .
RUN yarn install --pure-lockfile
COPY packages/frontend/ ./
RUN yarn run build

FROM node:11.6.0

WORKDIR /app

COPY packages/backend/package.json .
COPY packages/backend/yarn.lock .
RUN yarn install --pure-lockfile
COPY packages/backend/ ./
RUN yarn run build

COPY --from=vue /app/dist /app/public-vue

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
