FROM balenalib/odroid-xu4-alpine-python:latest

RUN pip install paho-mqtt

COPY dump1090pub.py /

CMD [ "python", "dump1090pub.py", "-m", "mqtt", "-H", "dump1090", "-r", "RTL", "-c" ]
