import { AsyncMqttClient } from "async-mqtt";

import { prisma, Transcription } from "../graphql/generated/prisma-client";
import log from "../log";
import {
  ApplicationListener,
  ApplicationMessageHandler
} from "./applicationListener";

const rootTopic = "transcription";

export default (client: AsyncMqttClient) => {
  const l = new ApplicationListener(
    rootTopic,
    client,
    new TranscriptionHandler(rootTopic)
  );
  return l.listen();
};

class TranscriptionHandler extends ApplicationMessageHandler {
  public callback = async (topic: string, payload: any, packet: any) => {
    if (!topic.indexOf("result")) {
      return;
    }
    log.info(
      `Transcription: processing on topic ${topic} ${
        Buffer.from(payload).length
      }`
    );

    let parsed: Transcription;

    try {
      parsed = JSON.parse(payload) as Transcription;
    } catch {
      log.error(
        new Error(`Malformed JSON received on MQTT topic ${topic}:

      ${payload.toString()}`)
      );
      return;
    }

    await prisma.updateTrunkedCall({
      data: { transcription: { create: parsed } },
      where: { id: parsed.id }
    });

    log.debug("Added a transcription to " + parsed.id);
  };
}
