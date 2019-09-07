import { AsyncMqttClient } from "async-mqtt";
import * as sbs from "sbs1-compat";
import {
  Dump1090MessageCreateInput,
  Dump1090MessageType,
  Dump1090TransmissionType,
  prisma,
} from "../graphql/generated/prisma-client";
import log from "../log";
import {
  ApplicationListener,
  ApplicationMessageHandler,
} from "./applicationListener";

const rootTopic = process.env.NODE_ENV === "production" ? "adsb/#" : "+/adsb/#";

export default (client: AsyncMqttClient) => {
  const l = new ApplicationListener(
    rootTopic,
    client,
    new Dump1090Handler(rootTopic),
  );
  return l.listen();
};

class Dump1090Handler extends ApplicationMessageHandler {
  public callback = async (topic: string, payload: Buffer, packet: any) => {
    log.info(
      `MQTT: dump1090 processing topic ${rootTopic} ${
        Buffer.from(payload).length
      }`,
    );

    log.silly(payload.toString());
    const parsed = sbs.parseSbs1Message(payload.toString()) as IDump1090Payload;

    if (parsed.hex_ident === null || parsed.hex_ident === undefined) {
      return;
    }

    const input: Dump1090MessageCreateInput = {
      messageType: "TRANSMISSION",
      alert: parsed.alert,
      latitude: parsed.lat,
      longitude: parsed.lon,
      altitude: parsed.altitude || -1,
      callsign: parsed.callsign,
      emergency: parsed.emergency || false,
      groupSpeed: parsed.ground_speed,
      aircraft: {
        connect: { IcaoID: parsed.hex_ident },
        create: { IcaoID: parsed.hex_ident },
      },
      isOnGround: parsed.is_on_ground,
      squawk: parsed.squawk,
      transmissionType: IDump1090TransmissionType[
        parsed.transmission_type
      ] as Dump1090TransmissionType,
      track: parsed.track,
      verticalRate: parsed.vertical_rate,
      flightId: parsed.flight_id,
      generated: new Date(),
      logged: new Date(),
    };

    await prisma
      .createDump1090Message(input)
      .catch((reason) => log.error(reason));
  }
}

interface IDump1090Payload {
  message_type: Dump1090MessageType;
  transmission_type: IDump1090TransmissionType;
  session_id?: string;
  aircraft_id?: string;
  hex_ident?: string;
  flight_id?: string;
  generated_date: string;
  generated_time: string;
  logged_date: string;
  logged_time: string;
  callsign?: string;
  altitude?: number;
  ground_speed?: number;
  track?: number;
  lat?: number;
  lon?: number;
  vertical_rate?: number;
  squawk?: string;
  alert?: boolean;
  emergency?: boolean;
  spi?: boolean;
  is_on_ground?: boolean;
}

enum IDump1090MessageType {
  SELECTION_CHANGE = "SEL",
  NEW_ID = "ID",
  NEW_AIRCRAFT = "AIR",
  STATUS_AIRCRAFT = "STA",
  CLICK = "CLK",
  TRANSMISSION = "MSG",
}

enum IDump1090TransmissionType {
  ES_IDENT_AND_CATEGORY = 1,
  ES_SURFACE_POS = 2,
  ES_AIRBORNE_POS = 3,
  ES_AIRBORNE_VEL = 4,
  SURVEILLANCE_ALT = 5,
  SURVEILLANCE_ID = 6,
  AIR_TO_AIR = 7,
  ALL_CALL_REPLY = 8,
}
