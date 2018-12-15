FROM telegraf:1.8-alpine
# copying telegraf configuration file.
COPY telegraf.conf /etc/telegraf/telegraf.conf
