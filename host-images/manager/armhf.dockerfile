FROM resin/odroid-xu4-node:carbon as frontend
WORKDIR /app

COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install --pure-lockfile
COPY frontend/ ./
RUN yarn run build

FROM resin/odroid-xu4-node:carbon

WORKDIR /app

COPY backend/package.json .
COPY backend/yarn.lock .
RUN yarn install --pure-lockfile
COPY backend/ ./
RUN yarn run build

COPY --from=frontend /app/dist/* /app/public/

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
