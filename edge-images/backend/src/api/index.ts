import cors from "@koa/cors";
import Koa from "koa";
import koaBody from "koa-body";
import koaLogger from "koa-logger";
import mount from "koa-mount";
import route from "koa-route";
import websockify from "koa-websocket";
import { hostname } from "os";
import through2 from "through2";
import log from "../log";
import { routes } from "./routes";
import { containerLogs, mqttWs } from "./routes/ws/logSocket";
import { getLoghose } from "./util/docker";

export const listen = async () => {
  const a = new Koa();

  a.use(cors({ origin: "*" }));
  a.use(koaLogger());

  a.use(koaBody());

  a.use(routes);
  a.on("error", (err, ctx) => {
    log.error("server error", err, ctx);
  });

  const app = websockify(new Koa());

  app.ws.use(
    route.all("/api/ws/logs", (ctx) => {
      const hose = getLoghose();
      hose.pipe(
        through2.obj((chunk, enc, cb) => {
          ctx.websocket.send(JSON.stringify(chunk));
          cb();
        }),
      );
    }),
  );
  app.use(mount("/api", a));

  const port = process.env.API_PORT || 9090;
  app.listen(port);
  log.info(
    `SkyScraper API is running on http://${hostname}:${process.env.API_PORT ||
      9090}`,
  );
};

export default listen;
