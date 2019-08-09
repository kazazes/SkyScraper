import dramatiq
import requests
import paho.mqtt.client as mqtt
import json
from dramatiq.brokers.redis import RedisBroker

redis_broker = RedisBroker(host="127.0.0.1", port=6537)
dramatiq.set_broker(redis_broker)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe("transcription/+/request")

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print(msg.topic)
    parsed = json.loads(msg.payload)
    remoteFile = 'https://edge.sibyl.vision' + parsed['wavPath']
    print('Wav Path: ' + remoteFile)
    transcribe(parsed, remoteFile)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set("edge", "Ur6yANnx@ZD")

@dramatiq.actor
def transcribe(payload, wavUrl):
    requestJson = {}
    requestJson['audio_url'] = wavUrl
    r = requests.post('http://localhost:9999/transcribe/url',
        data=json.dumps((requestJson)))
    r.raise_for_status()
    print(r.json()['blob'])
    resp = r.json()
    mqttResponse = {}
    mqttResponse['body'] = resp['blob']
    mqttResponse['callId'] = payload.id
#     mqttResponse['languageModel'] = resp.lm


client.connect("mqtt.skyscraper.ai", 1883, 60)

client.loop_forever()