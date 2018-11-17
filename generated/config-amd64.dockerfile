FROM alpine:3.7

COPY keys/* /root/.ssh/

RUN apk add --update \
  curl \
  git \
  ca-certificates \
  openssh-client

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

WORKDIR /data

RUN git clone git@github.com:kazazes/skyscraper-config.git /data/config

ENTRYPOINT [ "/bin/sh" ]
