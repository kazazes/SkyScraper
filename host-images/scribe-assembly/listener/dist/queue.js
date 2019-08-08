"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bull_1 = __importDefault(require("bull"));
var transcriptionQueue = new bull_1.default("transcriptionQueue", {
    redis: { host: process.env.REDIS_HOST, },
});
function add(message) {
    transcriptionQueue.add(message);
}
exports.add = add;
transcriptionQueue.process(function (job, done) {
    fetch("http://" + process.env.ASSEMBLY_HOST, {
        method: "POST",
        body: job.toString(),
        headers: {
            contentType: "application/json"
        }
    });
});
