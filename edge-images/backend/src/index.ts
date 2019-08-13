import * as debugAgent from "@google-cloud/debug-agent";
import log from "./log";
import { short } from "./util/git";
const debug = debugAgent.start({
  serviceContext: { service: "skyscraper-backend", version: short() },
  description: "SkyScraper Edge backend provider.",
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  appPathRelativeToRepository: "edge-images/backend/",
  allowExpressions: true,
});
import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_URI });

require("dotenv-safe").config();

import { listen as apiServer } from "./api";
import graphServer from "./graphql/server";
import { connect as connectMqtt } from "./mqtt/broker";

async function start() {
  await connectMqtt();
  graphServer();
  apiServer();
  return;
}

debug.isReady().then(() => start());
