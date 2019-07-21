import Koa from "koa";
import koaBody from "koa-body";
import { hostname } from "os";
import cors from "@koa/cors";
import { routes } from "./routes";
import log from "../log";

export const listen = async () => {
  const app = new Koa();

  app.use(koaBody());

  app.use(cors());

  app.use(routes);

  const port = process.env.API_PORT || 9090;
  app.listen(port);

  log.info(
    `SkyScraper API is running on http://${hostname}:${process.env.API_PORT ||
    9090}`
  );
};

export default listen;
