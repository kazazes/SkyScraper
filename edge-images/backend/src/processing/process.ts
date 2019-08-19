import { TrunkedCall } from "../graphql/generated/prisma-client";

import log from "../log";
import { publish } from "../mqtt/broker";

export const processTrunkedVoice = async (call: TrunkedCall | any) => {
  if (process.env.DISABLE_TRANSCRIPTION !== String(1)) {
    try {
      const topic = `transcription/${call.id}/request`;
      call.remotePath = call.remotePaths.find((path: string) => {
        return path.indexOf(".wav") !== -1;
      });
      await publish(topic, JSON.stringify(call), 2);
      log.debug(
        `Requested transcription for ${call.id} with path ${call.remotePath}`,
      );
    } catch (e) {
      log.error("Error publishing transcription MQTT request", e);
    }
  }
};
