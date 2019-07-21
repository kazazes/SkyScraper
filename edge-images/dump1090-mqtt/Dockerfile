FROM balenalib/intel-nuc-alpine-python:latest

RUN pip install paho-mqtt

COPY mqtt-adsb.py /usr/local/bin/mqtt-adsb.py

ENTRYPOINT ["/usr/local/bin/mqtt-adsb.py", "-m", "mqtt", "-H", "dump1090", "-r", "1"]
