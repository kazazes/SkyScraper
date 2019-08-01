import Koa from "koa";
import koaBody from "koa-body";
import { hostname } from "os";
import cors from "@koa/cors";
import { routes } from "./routes";
import log from "../log";
import websockify from "koa-websocket";
import { mqttWs } from "./routes/ws/mqtt";

export const listen = async () => {
  const app = websockify(new Koa());

  app.use(koaBody());

  app.use(cors());

  app.use(routes);
  app.ws.use(mqttWs);

  const port = process.env.API_PORT || 9090;
  app.listen(port);

  log.info(
    `SkyScraper API is running on http://${hostname}:${process.env.API_PORT ||
    9090}`
  );
};

export default listen;
