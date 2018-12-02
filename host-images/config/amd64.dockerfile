FROM alpine:3.7

COPY keys/* /root/.ssh/

RUN apk add --update \
  curl \
  git \
  ca-certificates \
  openssh-client \
  && rm -rf /var/cache/apk/*

RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan git.sibyl.vision >> ~/.ssh/known_hosts

RUN git clone git@git.sibyl.vision:peter/skyscraper-configurations.git

ENTRYPOINT ["/skyscraper-config/fetch-all.sh"]
