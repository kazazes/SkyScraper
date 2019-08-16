import consola from "consola";
import { createHash } from "crypto";

import { Prisma } from "../graphql/generated/prisma-client";

const prisma = new Prisma({
  endpoint: "http://http://192.168.1.102:4466",
  secret: "scrapingskies",
});

const shortname = "SFPD";
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

  delete tg.hex;
  tg.hash = hash;

  await prisma.deleteManyTrunkedTalkgroups({ hash });
  return prisma.createTrunkedTalkgroup(tg);
});

Promise.all(mapped)
  .then(() => consola.success(`Imported ${mapped.length} talkgroups`))
  .catch((e) => consola.error(e));
