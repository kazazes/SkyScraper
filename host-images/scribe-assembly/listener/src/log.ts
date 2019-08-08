import winston from "winston";

const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "ss-scribe-assembly" },
});

if (process.env.NODE_ENV !== "production") {
  log.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.simple(),
      ),
      level: "silly",
    }),
  );
} else {
  log.add(new winston.transports.Console());
}

export default log;
