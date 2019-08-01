FROM node:8-buster-slim

RUN apt-get update && apt-get install -y \
  git \
  python3 \
  python3-pip \
  sox \
  wget && \
  rm -rf /var/apt/lists/*

RUN pip3 install deepspeech

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json tsconfig.json yarn.lock .env.example ./
RUN yarn install --network-timeout 1000000000 --pure-lockfile && \
  touch .env && yarn cache clean

# Set environment variables
ENV NODE_ENV production

# Bundle app source
COPY ./src /usr/src/app/src
RUN yarn compile

CMD [ "yarn", "start" ]
