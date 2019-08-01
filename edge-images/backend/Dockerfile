FROM node:10-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json tsconfig.json yarn.lock ./
RUN yarn install --network-timeout 1000000000 --pure-lockfile

# Set environment variables
ENV NODE_ENV production

# Bundle app source
COPY ./src /usr/src/app/src
RUN yarn build

FROM ubuntu:xenial

RUN apt-get update && apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && \
  apt-get install -y software-properties-common --no-install-recommends && \
  add-apt-repository -y ppa:bladerf/bladerf && \
  add-apt-repository -y ppa:pothosware/framework && \
  add-apt-repository -y ppa:pothosware/support && \
  add-apt-repository -y ppa:myriadrf/drivers && \
  add-apt-repository -y ppa:ettusresearch/uhd && \
  apt-get update && \
  apt-get install -y --no-install-recommends \
  bladerf \
  nodejs \
  libbladerf-dev \
  librtlsdr-dev \
  yarn \
  python-dev \
  python3-soapysdr \
  python3 \
  build-essential \
  rtl-sdr \
  soapysdr-module-bladerf \
  soapysdr-module-rtlsdr \
  soapysdr-tools \
  swig && \
  rm -rf /var/apt/lists/*

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY package.json yarn.lock .env.example ./
RUN yarn install --pure-lockfile --prod --network-timeout 1000000000 && \
  touch .env && yarn cache clean
COPY --from=build /usr/src/app/dist/ ./dist
COPY --from=build /usr/src/app/src/ ./src

EXPOSE 4000 9090
CMD [ "yarn", "start" ]
