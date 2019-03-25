import json
import sys
import os

import paho.mqtt.client as mqtt

webDir = sys.argv[1]
mp3File = sys.argv[2]
system = sys.argv[3]
jsonFile = sys.argv[4]

client = mqtt.Client("trunk-recorder")
client.connect(os.environ['MQTT_HOST'])

with open(webDir + '/' + jsonFile) as f:
    data = json.load(f)

data.system = system
data.audioPath = webDir + mp3File

client.publish("trunk-recorder/" + system, data)
