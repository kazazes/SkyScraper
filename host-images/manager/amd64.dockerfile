FROM node:carbon as frontend
WORKDIR /src/frontend

COPY frontend/package.json .
COPY frontend/yarn.lock .
RUN yarn install --pure-lockfile
COPY frontend/ ./
RUN yarn run build

WORKDIR /app

COPY backend/package.json .
COPY backend/yarn.lock .
RUN yarn install --pure-lockfile
COPY backend/ ./
RUN yarn run build

RUN cp -r /src/frontend/dist/* ./public

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
