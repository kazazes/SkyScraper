FROM alpine:latest

RUN apk add --no-cache \
  --virtual .build-deps \
  git \
  make \
  g++ \
  pkgconfig

RUN apk add -X http://dl-cdn.alpinelinux.org/alpine/edge/testing librtlsdr-dev

RUN git clone https://github.com/MalcolmRobb/dump1090 /dump1090
WORKDIR /dump1090

RUN make BLADERF=no && cp *1090 /usr/local/bin && apk del .build-deps

COPY start.sh /start.sh

CMD ["/start.sh" ]
