import route from "koa-route";
import through from "through2";
import { client } from "../../../mqtt/broker";
import { containerLogsById, getLoghose } from "../../util/docker";

export const mqttWs = route.get("/mqtt", (ctx) => {
  client.on("message", (topic: string, payload: string, packet: any) => {
    const response = {
      topic,
      payload: JSON.stringify(JSON.parse(payload)),
    };

    ctx.websocket.send(JSON.stringify(response));
  });
});

export const logsWs = route.get("/logs", (ctx) => {
  client.on("message", (topic: string, payload: string, packet: any) => {
    const response = {
      logType: "mqtt",
      content: {
        topic,
        payload: JSON.stringify(JSON.parse(payload)),
      },
    };

    ctx.websocket.send(JSON.stringify(response));
  });
});

export const containerLogsWs = route.get("/logs/:containerId", async (ctx) => {
  const containerId = ctx.req.url.replace("/logs/", "");
  const stream = await containerLogsById(containerId);
  stream.on("data", function(chunk) {
    ctx.websocket.send(chunk.toString("utf8"));
  });
});

export const containerLogs = route.get("/ws/logs/docker", (ctx) => {
  const hose = getLoghose();
  hose.pipe(
    through.obj((chunk, enc, cb) => {
      ctx.websocket.send(JSON.stringify(chunk));
      cb();
    }),
  );
});
