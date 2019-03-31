FROM prom/prometheus:v2.8.1
RUN ["cross-build-start"]

COPY alert.rules promethieus.yml /etc/prometheus/
RUN ["cross-build-end"]
