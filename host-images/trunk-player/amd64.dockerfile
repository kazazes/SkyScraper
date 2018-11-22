FROM alpine:3.7

RUN apk add --virtual build-deps gcc python-dev musl-dev
RUN apk add --update \
  curl \
  git \
  ca-certificates \
  python3-dev \
  py-virtualenv \
  py-pip \
  libpq \
  postgresql-dev \
  && git clone https://github.com/kazazes/trunk-player

WORKDIR /trunk-player/


RUN virtualenv -p python3 env --prompt='(Trunk Player)' \
  && source ./env/bin/activate \
  && pip install --no-cache-dir -r requirements.txt --no-cache-dir \
  && ./manage.py collectstatic --noinput

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh" ]
