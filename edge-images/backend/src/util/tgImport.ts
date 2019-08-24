import consola from "consola";
import { createHash } from "crypto";

import { Prisma } from "../graphql/generated/prisma-client";

const prisma = new Prisma();

const shortName = "SFPD";
const tg: TGJson[] = require("./tg.json");

export interface TGJson {
  decimal: number;
  hex: any;
  mode: string;
  alphaTag: string;
  description: string;
  tag: string;
  group: string;
  priority: number;
  hash: string;
}

const mapped = tg.map(async (tg) => {
  const hash = createHash("md5")
    .update("SFPD" + tg.decimal)
    .digest("hex");

  tg.hex = tg.decimal.toString(16);
  tg.hash = hash;

  await prisma.deleteManyTrunkedTalkgroups({ hash });
  return prisma.createTrunkedTalkgroup(tg);
});

createSystem()
  .then(() => {
    return Promise.all(mapped);
  })
  .then(() => consola.success(`Imported ${mapped.length} talkgroups`))
  .catch((e) => consola.error(e));

async function createSystem() {
  return prisma.upsertTrunkedSystem({
    where: { shortName },
    create: {
      shortName,
      type: "SMARTNET",
    },
    update: {},
  });
}
