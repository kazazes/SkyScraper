import consola from "consola";
import { createHash } from "crypto";

import {
  Prisma,
  TrunkedSystemCreateWithoutTalkgroupsInput,
  TrunkedTalkgroupCreateInput,
} from "../../graphql/generated/prisma-client";

const prisma = new Prisma();

interface TalkgroupImport {
  talkgroups: TrunkedTalkgroupCreateInput[];
  system: TrunkedSystemCreateWithoutTalkgroupsInput;
}

const tgImport: TalkgroupImport = {
  talkgroups: require("./tg.json"),
  system: require("./system.json"),
};

const tgCreate = tgImport.talkgroups.map((tg) => {
  return createTalkgroup(tg, tgImport.system.shortName);
});

createSystem()
  .then((system) =>
    consola.success(
      `Imported ${system.shortName} with ${tgCreate.length} talkgroups`,
    ),
  )
  .catch((e) => consola.error(e));

async function createSystem() {
  const shortName = tgImport.system.shortName;
  consola.info(`Deleting existing talkgroups and systems`);
  // await prisma.deleteManyTrunkedTalkgroups({ id_not: null });
  // await prisma.deleteManyTrunkedSystems({ id_not: null });
  return prisma.upsertTrunkedSystem({
    create: {
      ...tgImport.system,
      talkgroups: {
        create: tgCreate,
      },
    },
    update: {
      ...tgImport.system,
    },
    where: {
      shortName,
    },
  });
}

function createTalkgroup(tg: TrunkedTalkgroupCreateInput, shortName: string) {
  const hash = createHash("md5")
    .update(shortName + tg.decimal)
    .digest("hex");

  tg.hex = tg.decimal.toString(16);
  tg.hash = hash;

  return tg;
}
