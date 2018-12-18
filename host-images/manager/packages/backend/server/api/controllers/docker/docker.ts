import { Request, Response } from "express";
import stringify from "json-stringify-safe";
import DockerService from "../../services/docker.service";

export class DockerController {
  public info(req: Request, res: Response): void {
    DockerService.info().then((info) => {
      res.type("json");
      res.send(info);
    });
  }

  public containers(req: Request, res: Response): void {
    DockerService.containers().then((containers) => {
      res.type("json");
      res.send(stringify(containers));
    });
  }
}

export default new DockerController();
