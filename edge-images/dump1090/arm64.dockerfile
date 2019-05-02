FROM alpine:latest

RUN apk add --no-cache \
  --virtual .build-deps \
  git \
  make \
  g++ \
  pkgconfig

RUN apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing \
  librtlsdr-dev && \
  apk add --no-cache bash

RUN git clone https://github.com/MalcolmRobb/dump1090 /dump1090
WORKDIR /dump1090

RUN make BLADERF=no && cp *1090 /usr/local/bin && apk del .build-deps

COPY start.sh /start.sh

CMD ["/start.sh" ]
