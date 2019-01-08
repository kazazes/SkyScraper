import { Application } from "express";
import dockerRouter from "./api/controllers/docker/router";
import examplesRouter from "./api/controllers/examples/router";
import hostRouter from "./api/controllers/host/router";

export default function routes(app: Application): void {
  app.use("/api/v1/examples", examplesRouter);
  app.use("/api/v1/docker", dockerRouter);
  app.use("/api/v1/host", hostRouter);
}
