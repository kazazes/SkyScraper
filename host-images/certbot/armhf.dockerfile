FROM balenalib/odroid-xu4-python:3-slim

ENV CF_EMAIL peter@peterk.co

WORKDIR /certbot

RUN apt-get update -qq && \
    apt-get install -y -qq git zip && \
    git clone https://github.com/certbot/certbot . && \
    python setup.py install && \
    pip3 install certbot-dns-cloudflare && \
    mkdir -p /etc/letsencrypt

COPY cli.ini dnscloudflare.ini /etc/letsencrypt/
RUN chmod 600 /etc/letsencrypt/dnscloudflare.ini
COPY docker-entrypoint.sh /usr/local/bin

CMD ["/usr/local/bin/docker-entrypoint.sh"]
