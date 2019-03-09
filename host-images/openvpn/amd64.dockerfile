FROM balenalib/intel-nuc-alpine:3.9

ENV VPN_HOST=sky.sibyl.vision

RUN apk add \
    openvpn && \
    rm  -rf /tmp/* /var/cache/apk/*

WORKDIR /ovpn

COPY client.ovpn docker-entrypoint.sh ./

CMD ["sh", "docker-entrypoint.sh"]
