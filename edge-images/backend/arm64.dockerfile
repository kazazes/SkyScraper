FROM node:10-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json tsconfig.json yarn.lock ./
RUN yarn install --network-timeout 1000000000 --frozen-lockfile

# Set environment variables
ENV NODE_ENV production

# Bundle app source
COPY ./src /usr/src/app/src
RUN yarn build

FROM node:10-alpine
ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package.json yarn.lock .env.example ./
RUN yarn install --pure-lockfile --prod --network-timeout 1000000000 && \
  touch .env && yarn cache clean
COPY --from=build /usr/src/app/dist/ ./dist
COPY --from=build /usr/src/app/src/ ./src

EXPOSE 4000 9090
CMD [ "yarn", "start" ]
