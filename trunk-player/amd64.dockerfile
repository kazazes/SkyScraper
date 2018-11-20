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
  openssh \
  && echo 'sdr' | passwd root --stdin \
  && rc-update add sshd

RUN git clone https://github.com/kazazes/trunk-player

WORKDIR /trunk-player/

COPY settings_local.py /trunk-player/trunk_player/
COPY start.sh /trunk-player

RUN chmod +x /trunk-player/start.sh \
  && virtualenv -p python3 env --prompt='(Trunk Player)' \
  && source ./env/bin/activate \
  && pip install --no-cache-dir -r requirements.txt --no-cache-dir \
  && ./manage.py collectstatic --noinput

ENTRYPOINT ["/trunk-player/start.sh" ]
