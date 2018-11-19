FROM resin/odroid-xu4-alpine:3.7

RUN apk add --virtual build-deps gcc python-dev musl-dev
RUN apk add --update \
  curl \
  git \
  ca-certificates \
  python3-dev \
  py-virtualenv \
  py-pip \
  libpq \
  postgresql-dev

RUN git clone https://github.com/kazazes/trunk-player

WORKDIR /trunk-player/

COPY settings_local.py ./trunk-player/
COPY start.sh .

RUN virtualenv -p python3 env --prompt='(Trunk Player)' \
  && source ./env/bin/activate \
  && pip install --no-cache-dir -r requirements.txt --no-cache-dir \
  && ./manage.py collectstatic --noinput

CMD [ "sh", "start.sh" ]
