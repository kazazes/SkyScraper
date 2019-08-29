import cors from "@koa/cors";
import Koa from "koa";
import koaBody from "koa-body";
import websockify from "koa-websocket";
import { hostname } from "os";
import log from "../log";
import { routes } from "./routes";
import { containerLogs, containerLogsWs, mqttWs } from "./routes/ws/logSocket";
const health = require("koa-ping-healthcheck");
const jwksRsa = require("jwks-rsa");

export const listen = async () => {
  const app = websockify(new Koa());

  app.use(koaBody());

  app.use(cors());

  app.use(routes);

  app.ws.use(mqttWs);
  app.ws.use(containerLogs);

  const port = process.env.API_PORT || 9090;
  app.listen(port);

  log.info(
    `SkyScraper API is running on http://${hostname}:${process.env.API_PORT ||
      9090}`,
  );
};

export default listen;
