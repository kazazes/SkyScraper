import sentry_sdk
import requests
import paho.mqtt.client as mqtt
import os
import json
from time import sleep
import concurrent.futures
import logging as log
import google.cloud.logging

sentry_sdk.init("https://0bb7658a24dd4665b9a3a09b9af333dc@sentry.io/1527343")

MAX_CONCURRENCY = int(os.getenv('MAX_CONCURRENCY', 1))
MQTT_HOST = os.getenv('MQTT_HOST', 'mqtt.skyscraper.ai')
MQTT_PASSWORD = os.getenv('MQTT_PASSWORD')
MQTT_PORT = int(os.getenv('MQTT_PORT', '1883'))
MQTT_USER = os.getenv('MQTT_USER')
TRANS_SERVER = os.getenv(
    'TRANSCRIPTION_SERVER', 'localhost:9999')
TRANS_HEALTH_ENDPOINT = 'http://' + TRANS_SERVER + '/health'
TRANS_AUDIO_ENDPOINT = 'http://' + TRANS_SERVER + '/transcribe/url'


log.basicConfig(level=log.DEBUG,
                format='%(asctime)s\t%(levelname)s\t%(threadName)s:\t %(message)s')
client = google.cloud.logging.Client()
client.setup_logging(log_level=10)
log.debug(f'Max parallel: {MAX_CONCURRENCY}')
log.debug(f'mqtt: {MQTT_USER}:{MQTT_PASSWORD}@{MQTT_HOST}')
log.debug(f'endpoint: {TRANS_SERVER}')
executor = concurrent.futures.ThreadPoolExecutor(max_workers=MAX_CONCURRENCY)


def transcription_healthcheck() -> bool:
    try:
        r = requests.get(TRANS_HEALTH_ENDPOINT)
        r.raise_on_status()
    except requests.exceptions.RequestException as e:
        log.error('Transcription healthcheck failed', e)
        return False
    finally:
        return True


# Ensure transcription server is online and healthy
if (transcription_healthcheck() is False):
    log.error('ERROR on transcription server healthcheck @ '
          + TRANS_HEALTH_ENDPOINT)
    exit(1)


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        log.info(f"MQTT connected to {MQTT_HOST}")
        client.subscribe("transcription/+/request")
    else:
        print("Bad connection Returned code=", rc)
        exit(1)


def on_message(client, userdata, msg):
    log.debug(f'Topic: {msg.topic}')
    parsed = json.loads(msg.payload)
    remoteFile = 'https://edge.sibyl.vision' + parsed['wavPath']
    log.debug(f'Remote: {remoteFile}')
    executor.submit(transcribe, parsed, remoteFile)


def publishTranscription(response):
    serialized = json.dumps(response)
    topic = 'transcription/' + response['callId'] + '/transcribed'
    client.publish(topic, payload=serialized, qos=2, retain=True)
    log.info(f'Published transcription result to {topic}')


def transcribe(payload: dict, wavUrl: str) -> None:
    requestJson = {}
    requestJson['audio_url'] = wavUrl
    try:
        if (os.getenv('DRY_RUN') == "1"):
            log.debug('Dry run, not sending')
            return
        log.info(f'Sent {payload["id"]} to transcription endpoint')
        r = requests.post(TRANS_AUDIO_ENDPOINT,
                          data=json.dumps(requestJson))
        if (r.status_code == 423):
            log.warning('Transcription server busy, sleeping 10 sec and resubmitting')
            sleep(10)
            executor.submit(transcribe, payload, wavUrl)
            return
        r.raise_for_status()
    except requests.exceptions.RequestException as e:
        log.error(e)
    finally:
        log.debug(f'{payload["id"]} - {wavUrl}')
        log.debug(f'Result: {r.json()["blob"]}')
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


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect
client.username_pw_set(MQTT_USER, MQTT_PASSWORD)

client.connect(MQTT_HOST, MQTT_PORT, 60)
client.loop_forever()
