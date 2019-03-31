FROM grafana:6.0.3
RUN ["cross-build-start"]

COPY  datasources dashboards /etc/grafana/
COPY setup.sh /setup.sh
RUN ["cross-build-end"]
