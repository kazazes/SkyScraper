FROM arm32v7/influxdb:latest

# The script "my_entrypoint.sh" is an extension of the existing script with extra instructions to mount the usb memory stick.
COPY my_entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY influxdb.conf /etc/influxdb
