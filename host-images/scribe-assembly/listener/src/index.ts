import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_URI });

require("dotenv-safe").config();

import log from "./log";
import mqtt from "mqtt";
import { addToQueue } from "./queue";

const mqttServer = `tcp://${process.env.MQTT_HOST}`
const client = mqtt.connect(mqttServer, { username: process.env.MQTT_USER, password: process.env.MQTT_PASSWORD })

client.on('connect', function () {
  client.subscribe('transcription/+/request', function (err) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  })
});

client.on('message', function (topic, message) {
  log.debug(`${topic}: ${message.toString()}`);
  addToQueue(JSON.parse(message.toString()))
});
