import * as Sentry from "@sentry/node";
Sentry.init({ dsn: process.env.SENTRY_URI });

require("dotenv-safe").config();

import { listen as apiServer } from "./api";
import graphServer from "./graphql/server";
import mqttListen from "./mqtt/listen";

graphServer();

mqttListen();

apiServer();
