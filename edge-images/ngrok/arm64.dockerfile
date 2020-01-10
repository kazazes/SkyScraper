FROM balenalib/odroid-xu4-debian

RUN apt update && \
  apt install -y --no-install-recommends \
  curl \
  python \
  python-dev \
  python-pip \
  python-openssl \
  python3-openssl\
  unzip

RUN architecture="" && \
  case $(uname -m) in \
  i386)   architecture="386" ;; \
  i686)   architecture="386" ;; \
  x86_64) architecture="amd64" ;; \
  arm)    dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;; \
  armv7l) architecture="arm" ;; \
  esac \
  && curl -Lo /ngrok.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-${architecture}.zip \
  && unzip -o /ngrok.zip -d /bin \
  && pip install idna \
  && rm -f /ngrok.zip

# Add config script.
COPY ngrok.yml /home/root/.ngrok2/
COPY entrypoint.sh /

EXPOSE 4040

CMD ["/entrypoint.sh"]
