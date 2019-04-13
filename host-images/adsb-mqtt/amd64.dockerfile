FROM balenalib/intel-nuc-debian-python:latest

RUN pip install paho-mqtt

COPY dump1090pub.py entrypoint.sh /

CMD [ "/entrypoint.sh" ]
