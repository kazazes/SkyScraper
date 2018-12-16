FROM resin/%%BALENA_MACHINE_NAME%%:3.7

RUN apk add --virtual build-deps gcc python-dev musl-dev
RUN apk add --update \
  curl \
  git \
  ca-certificates \
  python3-dev \
  py-virtualenv \
  py-pip \
  rsync \
  libpq \
  postgresql-dev \
  && git clone https://github.com/kazazes/trunk-player

WORKDIR /trunk-player/

RUN virtualenv -p python3 env --prompt='(Trunk Player)' \
  && source ./env/bin/activate \
  && pip install --no-cache-dir -r requirements.txt --no-cache-dir

RUN source ./env/bin/activate \
  && ./manage.py collectstatic --noinput \
  && ./manage.py migrate \
  && echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'peter@sibyl.vision', 'scrapingskies')" | python manage.py shell

EXPOSE 7055

COPY docker-entrypoint.sh /trunk-player/start.sh
RUN chmod a+x /trunk-player/start.sh
CMD ["/trunk-player/start.sh" ]
