import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { Application } from "express";
import http from "http";
import os from "os";
import path from "path";
import l from "./logger";
import swaggerify from "./swagger";

const app = express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET || "SETMEPLZ"));
    app.use(express.static(`${root}/public`));
    app.use(express.static(`${root}/public-vue`));
  }

  public router(routes: (app: Application) => void): ExpressServer {
    swaggerify(app, routes);
    return this;
  }

  public listen(p: string | number = process.env.PORT): Application {
    const welcome = (port) => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} @: ${os.hostname()} on port: ${port}}`,
      );
    http.createServer(app).listen(p, welcome(p));
    return app;
  }
}
