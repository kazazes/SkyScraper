FROM balenalib/odroid-xu4-alpine:3.7
RUN ["cross-build-start"]

ENV VPN_HOST=sky.sibyl.vision

RUN apk add \
 openvpn && \
 rm  -rf /tmp/* /var/cache/apk/*

WORKDIR /ovpn

COPY client.ovpn docker-entrypoint.sh ./

CMD ["sh", "docker-entrypoint.sh"]
RUN ["cross-build-end"]
