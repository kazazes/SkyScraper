FROM eclipse-mosquitto

COPY docker-entrypoint.sh /

COPY mosquitto.conf /mosquitto/config/

CMD docker-entrypoint.sh
