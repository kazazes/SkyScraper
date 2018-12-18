import pino from "pino";

const l = pino({
  name: process.env.APP_ID || "backend",
  level: process.env.LOG_LEVEL || "debug",
});

export default l;
