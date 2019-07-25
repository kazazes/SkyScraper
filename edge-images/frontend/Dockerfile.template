FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install --frozen-lockfile --network-timeout 1000000000

# Set environment variables
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# Bundle app source
COPY . /usr/src/app
RUN yarn build

# Clear the cache
RUN yarn cache clean

EXPOSE 3000
CMD [ "yarn", "start" ]
