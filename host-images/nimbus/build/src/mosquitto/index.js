"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mosca_1 = __importDefault(require("mosca"));
const log_1 = __importDefault(require("../log"));
const store = {
    type: 'redis',
    redis: require('redis'),
    return_buffers: true,
    host: process.env.REDIS_HOST || 'localhost'
};
const moscaSettings = {
    port: 1883,
    backend: store,
    persistence: {
        factory: mosca_1.default.persistence.Redis
    }
};
const server = new mosca_1.default.Server(moscaSettings);
server.on("ready", () => {
    log_1.default.info("Mosca server running on 1883");
    server.authenticate =
        (client, username, password, callback) => {
            var authorized = (username === process.env.MQTT_USER
                && password.toString() === process.env.MQTT_PASSWORD);
            if (authorized)
                client.user = username;
            callback(null, authorized);
        };
    server.on('published', function (packet, client) {
        log_1.default.verbose('Published', packet.topic, packet.payload);
    });
    server.on('clientConnected', function (client) {
        log_1.default.verbose('client connected', client.id);
    });
});
//# sourceMappingURL=index.js.map