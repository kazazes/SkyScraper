import mqtt, { AsyncMqttClient, IClientPublishOptions, QoS } from "async-mqtt";

import { hostname } from "os";
import log from "../log";
import debugAll from "./debugAll";
import dump1090 from "./dump1090";
import transcription from "./transcription";
import trunkRecorder from "./trunkRecorder";

const mqttServer = `tcp://${process.env.MQTT_HOST || "tcp://127.0.0.1"}`;
export let client: AsyncMqttClient;

export async function connect() {
  log.debug(`Connecting to MQTT server ${mqttServer}`);

  try {
    client = await mqtt.connect(mqttServer, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    });
  } catch (e) {
    log.emerg("Could not connect to local MQTT server @ " + mqttServer, e);
    process.exit(1);
  }

  client.on("connect", async () => {
    log.info(`Connected to MQTT server ${mqttServer}`);
    await subscribeListeners();
  });

  client.on("close", () => {
    log.error(`Closed connection to local MQTT server @ ${mqttServer}`);
  });

  client.on("error", (e) => {
    log.error("MQTT client error", e);
  });
}

export async function publish(
  topic: string,
  message: string | Buffer,
  qos?: QoS,
) {
  const defaultOptions: IClientPublishOptions = {
    qos: qos || 1,
    retain: false,
  };
  try {
    return client.publish(topic, message, defaultOptions);
  } catch (e) {
    log.error("Error publishing MQTT message", e);
  }
}

async function subscribeListeners() {
  try {
    await trunkRecorder(client);
    await dump1090(client);
    await transcription(client);
    if (process.env.NODE_ENV !== "production") { await debugAll(client); }
    log.debug("Subscribed listeners");
  } catch (e) {
    log.error("Couldn't subscribe mqtt backend listeners", e);
  }
}

export default client;
