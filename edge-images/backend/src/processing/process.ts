import { TrunkedCall } from "../graphql/generated/prisma-client";

import log from "../log";
import { publish } from "../mqtt/broker";

export const processTrunkedVoice = async (call: TrunkedCall) => {
  if (!process.env.DISABLE_TRANSCRIPTION) {
    try {
      const topic = `transcription/${ call.id }/request`;
      await publish(topic, JSON.stringify(call), 2);
      log.debug("Requested transcription for " + call.id);
    } catch (e) {
      log.error("Error publishing transcription MQTT request", e);
    }
  }
};
