FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --pure-lockfile --network-timeout 1000000000

# Set environment variables
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV NODE_ENV=production

# Bundle app source
COPY . /usr/src/app
RUN yarn build

EXPOSE 3000 9090
CMD [ "yarn", "start" ]
