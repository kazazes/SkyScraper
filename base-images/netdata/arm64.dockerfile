# SPDX-License-Identifier: GPL-3.0-or-later
# author  : paulfantom

# Cross-arch building is achieved by specifying ARCH_ALIAS as a build parameter with `--build-arg` option.
# It is automated in `build.sh` script
ARG ARCH_ALIAS=armhf
# This image contains preinstalled dependecies
FROM netdata/builder:${ARCH_ALIAS} as builder

# Copy source
COPY src /opt/netdata.git
WORKDIR /opt/netdata.git

# Install from source
RUN chmod +x netdata-installer.sh && ./netdata-installer.sh --dont-wait --dont-start-it

# files to one directory
RUN mkdir -p /app/usr/sbin/ \
             /app/usr/share \
             /app/usr/libexec \
             /app/usr/lib \
             /app/var/cache \
             /app/var/lib \
             /app/etc && \
    mv /usr/share/netdata   /app/usr/share/ && \
    mv /usr/libexec/netdata /app/usr/libexec/ && \
    mv /usr/lib/netdata     /app/usr/lib/ && \
    mv /var/cache/netdata   /app/var/cache/ && \
    mv /var/lib/netdata     /app/var/lib/ && \
    mv /etc/netdata         /app/etc/ && \
    mv /usr/sbin/netdata    /app/usr/sbin/ && \
    mv packaging/docker/run.sh        /app/usr/sbin/ && \
    chmod +x /app/usr/sbin/run.sh

#####################################################################
ARG ARCH
# This image contains preinstalled dependecies
FROM netdata/base:${ARCH_ALIAS}

# Conditional subscribiton to Polyverse's Polymorphic Linux repositories
RUN if [ "$(uname -m)" == "x86_64" ]; then \
        apk update && apk upgrade; \
        curl https://sh.polyverse.io | sh -s install gcxce5byVQbtRz0iwfGkozZwy support+netdata@polyverse.io; \
        if [ $? -eq 0 ]; then \
                apk update && \
                apk upgrade --available --no-cache && \
                sed -in 's/^#//g' /etc/apk/repositories; \
        fi \
    fi

# Copy files over
COPY --from=builder /app /

# Configure system
ARG NETDATA_UID=201
ARG NETDATA_GID=201
RUN \
    # fping from alpine apk is on a different location. Moving it.
    mv /usr/sbin/fping /usr/local/bin/fping && \
    chmod 4755 /usr/local/bin/fping && \
    mkdir -p /var/log/netdata && \
    # Add netdata user
    addgroup -g ${NETDATA_GID} -S netdata && \
    adduser -S -H -s /usr/sbin/nologin -u ${NETDATA_GID} -h /etc/netdata -G netdata netdata && \
    # Apply the permissions as described in
    # https://github.com/netdata/netdata/wiki/netdata-security#netdata-directories
    chown -R root:netdata /etc/netdata && \
    chown -R netdata:netdata /var/cache/netdata /var/lib/netdata /usr/share/netdata && \
    chown -R root:netdata /usr/lib/netdata && \
    chown -R root:netdata /usr/libexec/netdata/plugins.d/apps.plugin /usr/libexec/netdata/plugins.d/cgroup-network && \
    chmod 4750 /usr/libexec/netdata/plugins.d/cgroup-network /usr/libexec/netdata/plugins.d/apps.plugin && \
    chmod 0750 /var/lib/netdata /var/cache/netdata && \
    # Link log files to stdout
    ln -sf /dev/stdout /var/log/netdata/access.log && \
    ln -sf /dev/stdout /var/log/netdata/debug.log && \
    ln -sf /dev/stderr /var/log/netdata/error.log

ENV NETDATA_PORT 19999
EXPOSE $NETDATA_PORT

ENTRYPOINT ["/usr/sbin/run.sh"]
