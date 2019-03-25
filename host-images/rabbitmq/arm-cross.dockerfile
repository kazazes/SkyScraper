FROM rabbitmq:3
RUN ["cross-build-start"]

RUN rabbitmq-plugins enable rabbitmq_mqtt && \
  rabbitmq-plugins enable rabbitmq_management

COPY wrapper-entrypoint.sh /
COPY rabbitmq.conf /etc/rabbitmq/

EXPOSE 4369 15672 15675 1883 8883 5671 5672

ENTRYPOINT [ "/wrapper-entrypoint.sh" ]
RUN ["cross-build-end"]
