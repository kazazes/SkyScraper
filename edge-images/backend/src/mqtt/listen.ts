import mqtt from "async-mqtt";

import log from "../log";
import trunkRecorder from "./trunkRecorder";
import dump1090 from "./dump1090";

export default () => {
  const mqttServer = `tcp://${process.env.MQTT_HOST || "tcp://127.0.0.1"}`;
  log.debug(`Connecting to MQTT server ${mqttServer}`);

  const client = mqtt.connect(
      mqttServer, {
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
      }
  );

  client.on("connect", async () => {
    log.info(`Connected to MQTT server ${mqttServer}`);
    await trunkRecorder(client);
    await dump1090(client);
  });

  client.on("error", (e) => {
    log.error(e);
  });
};
