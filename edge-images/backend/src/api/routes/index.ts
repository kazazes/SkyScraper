import Router from "koa-router";

import deviceRoutes from "./device";

const router = new Router();

router.use("/device", deviceRoutes);

/**
 * Basic healthcheck
 */
router.get("/healthcheck", async ctx => (ctx.body = "OK"));

export const routes = router.routes();
