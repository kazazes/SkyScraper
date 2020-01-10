FROM balenalib/intel-nuc-alpine:3.9

COPY keys/* /root/.ssh/

RUN apk add --update \
  curl \
  git \
  ca-certificates \
  openssh-client \
  && rm -rf /var/cache/apk/*

ARG CACHEBUST=3
RUN chmod 600 /root/.ssh/id_rsa && eval $(ssh-agent -s) \
  && cat /root/.ssh/id_rsa | ssh-add - \
  && ssh-keyscan github.com >> ~/.ssh/known_hosts

ENV EDGE_HOSTNAME=skyscraper
RUN git clone git@github.com:SkyScraperAI/skyscraper-config.git config

ENTRYPOINT ["/config/fetch-all.sh"]
