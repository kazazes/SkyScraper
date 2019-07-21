import winston from "winston";

import { LoggingWinston } from "@google-cloud/logging-winston";

const loggingWinston = new LoggingWinston({
  serviceContext: {
    service: "edge-backend",
  }});

export const log = winston.createLogger({
  level: "silly",

  transports: [
    new winston.transports.Console(),
    loggingWinston,
  ],
});

export default log;
