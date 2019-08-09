import mqtt, { AsyncMqttClient, IClientPublishOptions, QoS } from 'async-mqtt';

import { hostname } from 'os';
import log from './log';

const mqttServer = `tcp://${process.env.MQTT_HOST || 'tcp://127.0.0.1'}`;
export let client: AsyncMqttClient;

export async function connect() {
  log.debug(`Connecting to MQTT server ${mqttServer}`);

  try {
    client = await mqtt.connect(mqttServer, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: `ss-backend-${process.env.BALENA_DEVICE_UUID || hostname()}`,
    });
  } catch (e) {
    log.emerg('Could not connect to local MQTT server @ ' + mqttServer, e);
    process.exit(1);
  }

  client.on('connect', async () => {
    log.info(`Connected to MQTT server ${mqttServer}`);
  });

  client.on('close', () => {
    log.error(`Closed connection to local MQTT server @ ${mqttServer}`);
  });

  client.on('error', e => {
    log.error('MQTT client error', e);
  });

  return client;
}

export async function publish(
  topic: string,
  message: string | Buffer,
  qos?: QoS
) {
  const defaultOptions: IClientPublishOptions = {
    qos: qos || 0,
  };
  try {
    return client.publish(topic, message, defaultOptions);
  } catch (e) {
    log.error('Error publishing MQTT message', e);
    return;
  }
}

export async function subscribe(
  rootTopic: string,
  callback: (topic: string, payload: Buffer, packet: any) => Promise<any>
) {
  try {
    await client.subscribe(rootTopic, { qos: 1 });
    client.on('message', (topic: string, payload: Buffer, packet: any) => {
      log.debug(`MQTT: Root listener received ${topic}`);
      callback(topic, payload, packet);
    });
  } catch (e) {
    log.error('Error subscribing or processing MQTT message', e);
  }
}
