import Router from "koa-router";
import { listContainers } from "../../util/docker";

const router = new Router();

router.get("/containers", async (ctx) => {
  const containers = await listContainers();
  ctx.body = containers.map((c) => {
    return {
      image: c.Image,
      id: c.Id,
      state: c.State,
      status: c.Status,
    };
  });
});

export default router.routes();
