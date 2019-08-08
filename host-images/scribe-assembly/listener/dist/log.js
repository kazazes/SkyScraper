"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var log = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "ss-scribe-assembly" },
});
if (process.env.NODE_ENV !== "production") {
    log.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.prettyPrint(), winston_1.default.format.simple()),
        level: "silly",
    }));
}
else {
    log.add(new winston_1.default.transports.Console());
}
exports.default = log;
