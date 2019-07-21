import Router from "koa-router";
import { logsForService } from "../../util/docker";

const router = new Router();

const logWhitelist = JSON.parse(process.env.LOG_WHITELIST) as Array<string>;

router.get("/:service", async ctx => {
  if (!logWhitelist || typeof logWhitelist !== "object") {
    return ctx.status = 500;
  }
  if (logWhitelist.indexOf(ctx.params["service"]) >= 0 ) {
    // TODO: Dockerode log, potentially a ws
    // if running in balena, make sure to set docker.sock
    ctx.body = await logsForService(ctx.params["service"], 100);
  }
});

export default router.routes();
