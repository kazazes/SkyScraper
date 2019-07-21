FROM alpine:latest

RUN apk add --no-cache \
  --virtual .build-deps \
  git \
  make \
  g++ \
  pkgconfig \
  build-base \
  libusb-dev \
  ncurses-dev

RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing \
  librtlsdr-dev && \
  apk add --no-cache bash libusb ncurses libusb

WORKDIR /dump1090
RUN git clone https://github.com/flightaware/dump1090 /dump1090 && \
    make BLADERF=no && \
    cp *1090 /usr/local/bin && \
    apk del .build-deps && \
    rm -rf /dump1090/*

COPY start.sh /start.sh

CMD ["/start.sh" ]
