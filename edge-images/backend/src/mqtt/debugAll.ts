import { AsyncMqttClient } from "async-mqtt";
import log from "../log";
import {
  ApplicationListener,
  ApplicationMessageHandler,
} from "./applicationListener";

const rootTopic = process.env.NODE_ENV === "production" ? "" : "#";

export default (client: AsyncMqttClient) => {
  const l = new ApplicationListener(
    rootTopic,
    client,
    new DebugHandler(rootTopic),
  );
  return l.listen();
};

class DebugHandler extends ApplicationMessageHandler {
  public callback = async (topic: string, payload: any, packet: any) => {
    const parsed = JSON.parse(payload) as any;
    log.silly(`${topic}:\n${JSON.stringify(parsed)}`);
  }
}
