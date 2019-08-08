import paho.mqtt.client as mqtt
from random import getrandbits
from os import getenv
import time

host = getenv('MQTT_HOST', "mqtt.skyscraper.ai")
port = int(getenv('MQTT_PORT', "1883"))
username = getenv('MQTT_USERNAME', '')
password = getenv('MQTT_PASSWORD', "")


class MyMQTTClass(mqtt.Client):

    def on_connect(self, mqttc, obj, flags, rc):
        print("rc: "+str(rc))

    def on_message(self, mqttc, obj, msg):
        print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))

    def on_publish(self, mqttc, obj, mid):
        print("Published mid: "+str(mid))

    def on_subscribe(self, mqttc, obj, mid, granted_qos):
        print("Subscribed: "+str(mid)+" "+str(granted_qos))

    def on_log(self, mqttc, obj, level, string):
        if (level == "MQTT_LOG_WARNING"):
            print(string)

    def run(self):
        self.username_pw_set(username, password)
        self.connect(host, 1883, 60)
        self.loop()

    def publish(self, topic, payload=None, qos=0, retain=False):
        print(topic + ": " + payload)
        return super().publish(topic, payload=payload, qos=qos, retain=retain)
