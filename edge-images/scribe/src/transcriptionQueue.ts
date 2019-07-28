import Queue, { Job, DoneCallback } from "bull";
import log from "./util/log";
import { readFile, readFileSync } from "fs";
import DeepSpeech from "./deepspeech";
import { publish } from "./util/mqtt";

interface TrunkedMQTTMessage {
  freq: number;
  start_time: number;
  stop_time: number;
  emergency: number;
  talkgroup: number;
  srcList: any[];
  duration: number;
  source: number;
  system: string;
  audioPath: string;
  wavPath: string;
  id: string;
  freqList: any[];
}

export class TranscriptionQueue extends Queue {
  deepSpeech: DeepSpeech;

  constructor() {
    super("transcription", {
      defaultJobOptions: { lifo: true },
      redis: { host: process.env.REDIS_HOST },
    });
    this.deepSpeech = new DeepSpeech();
    this.process(this.transcribe).catch(err => {
      log.error("Transcription error ", err);
    });
  }

  transcribe(job: Job, done: DoneCallback) {
    const call = job.data as TrunkedMQTTMessage;
    this.deepSpeech.transcribe(call.wavPath, (err: any, result: string) => {
      publish(
        `transcription/${call.id}/result`,
        JSON.stringify({ id: call.id, result })
      ).then(() => {
        done(err, result);
      });
    });
  }

  addMessageToQueue(message: Buffer) {
    let call: TrunkedMQTTMessage;
    try {
      call = JSON.parse(message.toString());
    } catch (e) {
      return log.error("Buffer parse error ", e);
    }

    if (!(call && call.wavPath && call.id && call.duration)) {
      return log.error(
        "Received malformed call. Expected id, wavPath and duration. ",
        call
      );
    }

    this.add(call, { lifo: true });

    return;
  }
}
