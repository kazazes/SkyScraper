import { AsyncMqttClient } from "async-mqtt";
import {
  prisma,
  TranscriptionCreateInput,
  TranscriptionWordCreateWithoutTranscriptionInput,
} from "../graphql/generated/prisma-client";
import log from "../log";
import {
  ApplicationListener,
  ApplicationMessageHandler,
} from "./applicationListener";

const rootTopic =
  process.env.NODE_ENV === "production" ? "transcription" : "+/transcription/#";

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
    if (topic.indexOf("transcribed") == -1) {
      return;
    }
    log.info(
      `Transcription: received on topic ${topic} ${Buffer.from(payload).length}`,
    );

    let parsed: any;

    try {
      parsed = JSON.parse(payload) as any;
    } catch {
      log.error(
        new Error(`Malformed JSON received on MQTT topic ${topic}:

      ${payload.toString()}`),
      );
      return;
    }

    const createWordsInput:
      | TranscriptionWordCreateWithoutTranscriptionInput[]
      | null = parsed.words
      ? parsed.words.map((word: any) => {
          const w: TranscriptionWordCreateWithoutTranscriptionInput = {
            confidence: word.confidence,
            end: word.end,
            start: word.start,
            text: word.text,
          };
          return w;
        })
      : null;

    try {
      await prisma.updateTrunkedCall({
        data: {
          transcription: {
            create: {
              body: parsed.body,
              duration: parsed.duration,
              alpha: parsed.alpha,
              beta: parsed.beta,
              languageModel: parsed.languageModel || "",
              words:
                createWordsInput !== null
                  ? { create: createWordsInput }
                  : undefined,
            },
          },
        },
        where: { callHash: parsed.callHash },
      });
    } catch (e) {
      log.error(`Error adding transcript to trunked call`, e);
    } finally {
      log.debug("Added a transcription to " + parsed.callId);
    }
  }
}
