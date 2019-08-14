import * as debugAgent from "@google-cloud/debug-agent";
const debug = debugAgent.start({
  serviceContext: { service: "skyscraper-backend" },
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

if (process.env.NODE_ENV === "production") debug.isReady().then(() => start());
else start();
