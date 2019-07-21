import { TrunkedCall } from "../graphql/generated/prisma-client";

import CloudStorage from "./cloudStorage";
import CloudPublish from "./transcription";
import log from "../log";

const UUID = process.env.BALENA_DEVICE_UUID || "skyscraper-test";

const storage = new CloudStorage(UUID);
const publisher = new CloudPublish("transcribe");

export const processTrunkedVoice = async (call: TrunkedCall) => {
  if (!process.env.ENABLE_UPLOAD) {
    return;
  }

  await storage.initialize();
  const [mp3File] = await storage.uploadAudio(call.id, call.audioPath);
  const [wavFile] = await storage.uploadAudio(call.id, call.wavPath);

  log.info(`Uploaded ${mp3File.name} to bucket ${mp3File.bucket}`);
  log.info(`Uploaded ${wavFile.name} to bucket ${wavFile.bucket}`);

  if (!process.env.ENABLE_TRANSCRIPTION) {
    return;
  }

  const t = await publisher.initialize();
  return t.publishJSON(call);
};
