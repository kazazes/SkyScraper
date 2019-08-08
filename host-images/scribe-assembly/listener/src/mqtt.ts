import mqtt, { AsyncMqttClient } from "async-mqtt"
import log from "./log";
const mqttServer = `tcp://${process.env.MQTT_HOST}`

export class TranscriptionListener {
  client!: AsyncMqttClient

  async connect() {
    try {
      this.client = await mqtt.connect(mqttServer, {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
      });

      this.client.on('connect', () => {
        log.info(`Connected to MQTT server ${mqttServer}`);
      });

      this.client.on('close', () => {
        log.error(`Closed connection to local MQTT server @ ${mqttServer}`);
      });

      this.client.on('error', e => {
        log.error('MQTT client error', e);
      });

      this.client.on("message", (topic, payload) => {
        log.info(`${topic}: ${payload}`)
      })
    } catch (e) {
      log.emerg('Could not connect to local MQTT server @ ' + process.env.MQTT_HOST, e);
      process.exit(1);
    }
  }
}
