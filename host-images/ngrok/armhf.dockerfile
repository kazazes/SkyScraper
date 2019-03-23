FROM balenalib/odroid-xu4-alpine:3.9

RUN apk add --no-cache \
    curl \
    python \
    python-dev \
    py-pip \
    py-openssl \
    py3-openssl

RUN architecture="" && \
    case $(uname -m) in \
    i386)   architecture="386" ;; \
    i686)   architecture="386" ;; \
    x86_64) architecture="amd64" ;; \
    arm)    dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;; \
    esac \
    && curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-${architecture}.zip \
    && unzip -o /ngrok.zip -d /bin \
    && pip install idna \
    && rm -f /ngrok.zip \
    # Create non-root user.
    && adduser -h /home/ngrok -D -u 6737 ngrok

# Add config script.
COPY ngrok.yml /home/ngrok/.ngrok2/
COPY entrypoint.sh /

USER ngrok
ENV USER=ngrok

EXPOSE 4040

CMD ["/entrypoint.sh"]
