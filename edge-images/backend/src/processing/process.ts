import { TrunkedCall } from "../graphql/generated/prisma-client";

import { readFile } from "fs";
import log from "../log";
import { publish } from "../mqtt/broker";
import CloudStorage from "./cloudStorage";
import CloudPublish from "./transcription";

const UUID = process.env.BALENA_DEVICE_UUID || "skyscraper-test";

const storage = new CloudStorage(UUID);
const publisher = new CloudPublish("transcribe");

export const processTrunkedVoice = async (call: TrunkedCall) => {
  if (process.env.ENABLE_UPLOAD === "1") {
    try {
      await storage.initialize();
      const [mp3File] = await storage.uploadAudio(call.id, call.audioPath);
      const [wavFile] = await storage.uploadAudio(call.id, call.wavPath);

      log.info(`Uploaded ${mp3File.name} to bucket ${mp3File.bucket}`);
      log.info(`Uploaded ${wavFile.name} to bucket ${wavFile.bucket}`);
    } catch (e) {
      log.error("Error uploading trunked voice to GCS", e);
    }
  }

  if (process.env.ENABLE_TRANSCRIPTION === "1") {
    try {
      const topic = `transcription/${call.id}/request`;
      await publish(topic, JSON.stringify(call), 2);
      log.debug("Requested transcription for " + call.id);
    } catch (e) {
      log.error("Error publishing transcription MQTT request", e);
    }
  }
};
