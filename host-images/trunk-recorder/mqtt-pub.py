import json
import sys

import paho.mqtt.client as mqtt

webDir = sys.argv[1]
mp3File = sys.argv[2]
system = sys.argv[3]
jsonFile = sys.argv[4]

client = mqtt.Client("trunk-recorder")
client.connect("127.0.0.1")

with open(webDir + '/' + jsonFile) as f:
    data = json.load(f)

data.system = system
data.audioPath = webDir + mp3File

client.publish("truk-recorder/" + system, data, data)
