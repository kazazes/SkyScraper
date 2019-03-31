FROM grafana:6.0.3

COPY  datasources dashboards /etc/grafana/
COPY setup.sh /setup.sh
