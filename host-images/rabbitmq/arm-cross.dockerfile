FROM rabbitmq:3
RUN ["cross-build-start"]

RUN rabbitmq-plugins enable rabbitmq_mqtt && \
  rabbitmq-plugins enable rabbitmq_management

EXPOSE 4369 15672 15675 1883 8883 5671 5672
RUN ["cross-build-end"]
