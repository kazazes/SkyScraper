import dramatiq
import requests
import paho.mqtt.client as mqtt
import os
import json
from dramatiq.brokers.redis import RedisBroker

REDIS_HOST = os.getenv('REDIS_HOST', '127.0.0.1')
REDIS_PORT = int(os.getenv('REDIS_PORT', '6537'))
TRANSCRIPTION_ENDPOINT = os.getenv('TRANSCRIPTION_ENDPOINT',
                                   'http://localhost:9999/transcribe/url')
MQTT_USER = os.getenv('MQTT_USER')
MQTT_PASSWORD = os.getenv('MQTT_PASSWORD')
MQTT_HOST = os.getenv('MQTT_HOST', 'mqtt.skyscraper.ai')
MQTT_PORT = int(os.getenv('MQTT_PORT', '1883'))

redis_broker = RedisBroker(host=REDIS_HOST, port=REDIS_PORT)
dramatiq.set_broker(redis_broker)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("MQTT connected to", MQTT_HOST)
    else:
        print("Bad connection Returned code=", rc)
        exit(1)
    client.subscribe("transcription/+/request")


def on_message(client, userdata, msg):
    print('Topic:', msg.topic)
    parsed = json.loads(msg.payload)
    remoteFile = 'https://edge.sibyl.vision' + parsed['wavPath']
    print('Remote: ' + remoteFile)
    transcribe(parsed, remoteFile)


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect
client.username_pw_set(MQTT_USER, MQTT_PASSWORD)


def publishTranscription(response):
    serialized = json.dumps(response)
    topic = 'transcription/' + response['callId'] + '/transcribed'
    client.publish(topic, payload=serialized, qos=2, retain=True)
    print('Published transcription result to ' + topic + '\n\n')


@dramatiq.actor
def transcribe(payload: dict, wavUrl: str) -> None:
    requestJson = {}
    requestJson['audio_url'] = wavUrl
    print('Sent ' + payload['id'] + ' to transcription endpoint\n')
    r = requests.post(TRANSCRIPTION_ENDPOINT,
                      data=json.dumps(requestJson))
    r.raise_for_status()
    print(payload['id'] + ' - ' + wavUrl + '\nResult:', r.json()['blob'])
    resp = r.json()
    mqttResponse = {}
    mqttResponse['body'] = resp['blob']
    mqttResponse['languageModel'] = resp['lm']
    mqttResponse['beta'] = resp['beta']
    mqttResponse['words'] = resp['words']
    mqttResponse['duration'] = resp['duration']
    mqttResponse['alpha'] = resp['alpha']
    mqttResponse['callId'] = payload['id']
    publishTranscription(mqttResponse)


client.connect(MQTT_HOST, MQTT_PORT, 60)
client.loop_forever()
