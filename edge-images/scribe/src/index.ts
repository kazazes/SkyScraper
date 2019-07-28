require("dotenv-safe").config();
import { which, ls } from "shelljs";
import * as Sentry from "@sentry/node";
import { connect as mqttConnect, subscribe } from "./util/mqtt";
import log from "./util/log";
import { existsSync } from "fs";
import { TranscriptionQueue } from "./transcriptionQueue";

Sentry.init({ dsn: process.env.SENTRY_URI });

async function start() {
  sanityChecks();

  const queue = new TranscriptionQueue();

  await mqttConnect();
  await subscribe(
    "transcription/+/request",
    async (topic, payload, _packet) => {
      queue.addMessageToQueue(payload);
      log.verbose(`Added ${topic} to queue`);
    }
  );
}

function sanityChecks() {
  // deepspeech binary in path
  const deepspeechPath = which("deepspeech");
  if (deepspeechPath.length === 0) {
    throw new Error("DeepSpeech python executable not found in path");
  }
  log.silly("deepspeech path: " + deepspeechPath);

  // model files present
  if (!existsSync(process.env.DEEPSPEECH_MODEL_DIR as string)) {
    const err = new Error(
      "Model directory missing " + process.env.DEEPSPEECH_MODEL_DIR
    );
    log.error("Model err ", err);
    throw err;
  }
  const modelFiles = ls([process.env.DEEPSPEECH_MODEL_DIR as string]);
  const requiredFiles = [
    "output_graph.pbmm",
    "alphabet.txt",
    "lm.binary",
    "trie",
  ];
  const missing = requiredFiles.filter(file => !modelFiles.includes(file));
  if (missing.length > 0) {
    throw new Error(
      `Missing model files in ${
        process.env.DEEPSPEECH_MODEL_DIR
      }: \n\n${missing.join("\n")}`
    );
  }
  log.silly("Model files present.");
}

start();
