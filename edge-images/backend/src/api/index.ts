import cors from "@koa/cors";
import Koa from "koa";
import koaBody from "koa-body";
import koaLogger from "koa-logger";
import route from "koa-route";
import websockify from "koa-websocket";
import { hostname } from "os";
import log from "../log";
import { routes } from "./routes";
import { containerLogs, mqttWs } from "./routes/ws/logSocket";

export const listen = async () => {
  const app = websockify(new Koa());

  app.use(koaLogger());

  app.use(koaBody());

  app.use(cors());

  app.use(routes);

  app.ws.use(containerLogs);

  app.on("error", (err, ctx) => {
    log.error("server error", err, ctx);
  });

  const port = process.env.API_PORT || 9090;
  app.listen(port);
  log.info(
    `SkyScraper API is running on http://${hostname}:${process.env.API_PORT ||
      9090}`,
  );
};

export default listen;
