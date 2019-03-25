FROM rabbitmq:3

RUN rabbitmq-plugins enable rabbitmq_mqtt && \
  rabbitmq-plugins enable rabbitmq_management

EXPOSE 4369 15672 15675 1883 8883 5671 5672
