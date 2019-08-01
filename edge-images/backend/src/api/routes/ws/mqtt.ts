import { client } from "../../../mqtt/broker";
import route from "koa-route";

export const mqttWs = route.all('/mqtt', (ctx) => {
  client.on("message", (topic: string, payload: string, packet: any) => {
    ctx.websocket.send(payload);
  });
});
