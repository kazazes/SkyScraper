FROM resin/odroid-xu4-debian:stretch
RUN ["cross-build-start"]

# Enable systemd
ENV INITSYSTEM on

# versions
ENV PROMETHEUS_VERSION 2.8.1
ENV NODE_EXPORTER_VERSION 0.17.0
ENV ALERTMANAGER_VERSION 0.16.1
# arch
ENV DIST_ARCH linux-amd64

# default configs
ENV THRESHOLD_CPU 50
ENV THRESHOLD_FS 50
ENV THRESHOLD_MEM 500
ENV STORAGE_LOCAL_RETENTION 30h0m0s

# downloading utils
RUN apt-get update && apt-get install -y wget build-essential

WORKDIR /etc

# get prometheus server
RUN wget https://github.com/prometheus/prometheus/releases/download/v$PROMETHEUS_VERSION/prometheus-$PROMETHEUS_VERSION.$DIST_ARCH.tar.gz  \
	&& tar xvfz prometheus-$PROMETHEUS_VERSION.$DIST_ARCH.tar.gz \
	&& rm prometheus-$PROMETHEUS_VERSION.$DIST_ARCH.tar.gz

# get prometheus alertmanager
RUN wget https://github.com/prometheus/alertmanager/releases/download/v$ALERTMANAGER_VERSION/alertmanager-$ALERTMANAGER_VERSION.$DIST_ARCH.tar.gz  \
	&& tar xvfz alertmanager-$ALERTMANAGER_VERSION.$DIST_ARCH.tar.gz \
	&& rm alertmanager-$ALERTMANAGER_VERSION.$DIST_ARCH.tar.gz

# get node exporter
RUN wget https://github.com/prometheus/node_exporter/releases/download/v$NODE_EXPORTER_VERSION/node_exporter-$NODE_EXPORTER_VERSION.$DIST_ARCH.tar.gz  \
	&& tar xvfz node_exporter-$NODE_EXPORTER_VERSION.$DIST_ARCH.tar.gz \
	&& rm node_exporter-$NODE_EXPORTER_VERSION.$DIST_ARCH.tar.gz

COPY config/ ./config

WORKDIR /

COPY start.sh ./

# run when container lands on device
CMD ["bash", "start.sh"]
RUN ["cross-build-end"]
