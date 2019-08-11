import { AsyncMqttClient } from "async-mqtt";
import { TranscriptionWordCreateWithoutTranscriptionInput } from "../../../frontend/assets/prisma-client/index";
import {
  prisma,
  TranscriptionCreateWithoutCallInput,
} from "../graphql/generated/prisma-client";
import log from "../log";
import {
  ApplicationListener,
  ApplicationMessageHandler,
} from "./applicationListener";

const rootTopic = "transcription";

export default (client: AsyncMqttClient) => {
  const l = new ApplicationListener(
    rootTopic,
    client,
    new TranscriptionHandler(rootTopic),
  );
  return l.listen();
};

class TranscriptionHandler extends ApplicationMessageHandler {
  public callback = async (topic: string, payload: any, packet: any) => {
    if (!topic.indexOf("transcribed")) {
      return;
    }
    log.info(
      `Transcription: received on topic ${topic} ${Buffer.from(payload).length}`,
    );

    let parsed: any;

    try {
      parsed = JSON.parse(payload) as any;
      if (parsed.words.length === 0 || parsed.languageModel === "") {
        return;
      }
    } catch {
      log.error(
        new Error(`Malformed JSON received on MQTT topic ${topic}:

      ${payload.toString()}`),
      );
      return;
    }

    const createWordsInput: TranscriptionWordCreateWithoutTranscriptionInput[] = parsed.words
      ? parsed.words.map((word: any) => {
          const w: TranscriptionWordCreateWithoutTranscriptionInput = {
            confidence: word.confidence,
            end: word.end,
            start: word.start,
            text: word.text,
          };
          return w;
        })
      : [];

    const createTranscriptionInput: TranscriptionCreateWithoutCallInput = {
      body: parsed.body,
      duration: parsed.duration,
      alpha: parsed.alpha,
      beta: parsed.beta,
      languageModel: parsed.languageModel || "",
      words: { create: createWordsInput },
    };

    try {
      await prisma.updateTrunkedCall({
        where: { id: parsed.callId },
        data: { transcription: { create: createTranscriptionInput } },
      });
    } catch (e) {
      log.error(
        `Error adding transcript to trunked call \n ${JSON.stringify(
          createTranscriptionInput,
          null,
          2,
        )}`,
        e,
      );
    } finally {
      log.debug("Added a transcription to " + parsed.callId);
    }
  }
}
