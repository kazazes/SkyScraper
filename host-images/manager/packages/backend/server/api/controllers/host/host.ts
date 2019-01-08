import { Request, Response } from "express";
import HostService from "../../services/host.service";

export class HostController {
  public usbDevices(req: Request, res: Response): void {
    HostService.usbDevices().then((info) => {
      res.type("json");
      res.send(info);
    });
  }
  public sdrDevices(req: Request, res: Response): void {
    HostService.sdrDevices().then((info) => {
      res.type("json");
      res.send(info);
    });
  }
}

export default new HostController();
