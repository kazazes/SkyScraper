import { TrunkedCall } from "../graphql/generated/prisma-client";

import log from "../log";
import { publish } from "../mqtt/broker";

export const processTrunkedVoice = async (call: TrunkedCall) => {
  if (
    process.env.ENABLE_TRANSCRIPTION &&
    process.env.ENABLE_TRANSCRIPTION !== "0"
  ) {
    try {
      const topic = `transcription/${call.id}/request`;
      await publish(topic, JSON.stringify(call), 2);
      log.debug("Requested transcription for " + call.id);
    } catch (e) {
      log.error("Error publishing transcription MQTT request", e);
    }
  }
};
