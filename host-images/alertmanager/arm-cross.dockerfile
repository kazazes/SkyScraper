FROM prom/alertmanager:v0.16.1
RUN ["cross-build-start"]

COPY config.yml /etc/alertmanager/
RUN ["cross-build-end"]
