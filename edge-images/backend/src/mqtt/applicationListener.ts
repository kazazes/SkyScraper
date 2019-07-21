import { AsyncMqttClient } from "async-mqtt";
import log from "../log";

export type MessageCallback = (
  topic: string,
  payload: any,
  packet: any,
) => void;

export abstract class ApplicationMessageHandler {
  public topic: string;
  public abstract callback: MessageCallback;

  constructor(topicString: string) {
    this.topic = topicString;
  }
}

export class ApplicationListener {
  private rootTopic: string;
  private client: AsyncMqttClient;
  private handler: ApplicationMessageHandler;

  constructor(
    topic: string,
    mqttClient: AsyncMqttClient,
    messageHandler: ApplicationMessageHandler,
  ) {
    this.rootTopic = topic;
    this.client = mqttClient;
    this.handler = messageHandler;
  }

  public async listen() {
    await this.client.subscribe(this.rootTopic + "/#");
    log.info(`Subscribed to root topic ${this.rootTopic}/#`);
    this.client.on("message", (topic: string, payload: string, packet: any) => {
      log.debug(`MQTT: Root listener received ${topic}`);
      if (topic.indexOf(this.rootTopic) >= 0) {
        this.handler.callback(topic, payload, packet);
      }
    });
  }
}
