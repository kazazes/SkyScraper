import mosca, { Client } from "mosca";
import log from "../log";

const store: any = {
  type: 'redis',
  redis: require('redis'),
  return_buffers: true,
  host: process.env.REDIS_HOST || 'localhost'
}

const moscaSettings: any = {
  port: 1883,
  backend: store,
  persistence: {
    factory: mosca.persistence.Redis
  }
}

const server = new mosca.Server(moscaSettings);

server.on("ready", () => {
  log.info("Mosca server running on 1883");

  server.authenticate =
    (client: Client, username, password, callback) => {
      var authorized = (username === process.env.MQTT_USER
        && password.toString() === process.env.MQTT_PASSWORD);
      if (authorized) (client as any).user = username;
      callback(null, authorized);
    }

  server.on('published', function (packet, client) {
    log.verbose('Published', packet.topic, packet.payload);
  });

  server.on('clientConnected', function (client: any) {
    log.verbose('client connected', client.id);
  });
})
