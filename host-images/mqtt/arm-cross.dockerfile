FROM balenalib/odroid-xu4-alpine:latest AS build
RUN ["cross-build-start"]

# Install the run-time dependencies
RUN apk update && \
    apk --no-cache add \
    busybox \
    openssl-dev \
    libuuid \
    libwebsockets \
    musl \
    mosquitto

# Set up the mosquitto directories and the mosquitto user
RUN mkdir -p /mosquitto/config /mosquitto/data /mosquitto/log && \
    chown -R mosquitto:mosquitto /mosquitto

COPY mosquitto.conf /mosquitto/config/

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/usr/sbin/mosquitto", "-c", "/mosquitto/config/mosquitto.conf"]
RUN ["cross-build-end"]
