import { AsyncMqttClient } from "async-mqtt";
import { createHash } from "crypto";

import {
  prisma,
  TrunkedCallCreateInput,
  TrunkedCallFrequencyTimeCreateInput,
  TrunkedCallSourceCreateInput,
} from "../graphql/generated/prisma-client";
import log from "../log";
import { processTrunkedVoice } from "../processing/process";
import {
  ApplicationListener,
  ApplicationMessageHandler,
} from "./applicationListener";

const rootTopic = "/trunk-recorder";

export default (client: AsyncMqttClient) => {
  const l = new ApplicationListener(
    rootTopic,
    client,
    new TrunkRecorderHandler(rootTopic),
  );
  return l.listen();
};

class TrunkRecorderHandler extends ApplicationMessageHandler {
  public callback = async (topic: string, payload: any, packet: any) => {
    log.info(
      `MQTT: trunk-recorder processing on topic ${rootTopic} ${
        Buffer.from(payload).length
      }`,
    );

    let parsed: TrunkedMQTTMessage;

    try {
      parsed = JSON.parse(payload) as TrunkedMQTTMessage;
    } catch {
      log.error(
        new Error(`Malformed JSON received on MQTT topic ${topic}:

      ${payload.toString()}`),
      );
      return;
    }

    const sys = await prisma.upsertTrunkedSystem({
      where: { shortName: parsed.system },
      create: { shortName: parsed.system, type: "UNKNOWN" },
      update: {},
    });

    const tgHash = createHash("md5")
      .update(sys.shortName + parsed.talkgroup)
      .digest("hex");

    const callHash = createHash("md5")
      .update(parsed.talkgroup + parsed.freq + parsed.start_time.toString())
      .digest("hex");

    const tg = await prisma.upsertTrunkedTalkgroup({
      where: { hash: tgHash },
      create: {
        decimal: parsed.talkgroup,
        hash: tgHash,
        system: { connect: { shortName: parsed.system } },
      },
      update: {},
    });

    const call: TrunkedCallCreateInput = {
      frequency: parsed.freq,
      startTime: new Date(parsed.start_time * 1000),
      endTime: new Date(parsed.stop_time * 1000),
      emergency: Boolean(Number(parsed.emergency)),
      talkgroup: { connect: { id: tg.id } },
      system: { connect: { id: sys.id } },
      callHash,
      sources: {
        create: parsed.srcList.map((value) => {
          const s: TrunkedCallSourceCreateInput = {
            position: value.pos,
            sourceId: value.src,
            time: new Date(value.time * 1000),
          };
          return s;
        }),
      },
      source: parsed.source,
      audioPath: parsed.audioPath,
      wavPath: parsed.wavPath,
      duration: parsed.duration,
      remotePath: `${process.env.HOSTNAME || "https://edge.sibyl.vision"}${
        parsed.wavPath
      }`,
      frequencyList: {
        create: parsed.freqList.map((fs) => {
          const f: TrunkedCallFrequencyTimeCreateInput = {
            errors: fs.error_count,
            frequency: fs.freq,
            length: fs.len,
            position: fs.pos,
            spikes: fs.spike_count,
            time: fs.time,
          };
          return f;
        }),
      },
    };

    try {
      const c = await prisma.upsertTrunkedCall({
        where: { callHash },
        create: call,
        update: {},
      });

      await processTrunkedVoice(c).catch((e) => {
        log.error(e);
      });
    } catch (e) {
      throw e;
    }
  }
}

interface SrcList {
  src: number;
  time: number;
  pos: number;
}

interface FreqList {
  freq: number;
  time: number;
  pos: number;
  len: number;
  error_count: number;
  spike_count: number;
}

interface TrunkedMQTTMessage {
  freq: number;
  start_time: number;
  stop_time: number;
  emergency: number;
  talkgroup: number;
  srcList: SrcList[];
  duration: number;
  source: number;
  system: string;
  audioPath: string;
  wavPath: string;
  freqList: FreqList[];
}
