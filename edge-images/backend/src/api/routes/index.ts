import Router from "koa-router";

import deviceRoutes from "./device";

const router = new Router();

router.use("/device", deviceRoutes);

/**
 * Basic healthcheck
 */
router.get("/healthcheck", async (ctx) => (ctx.body = "OK"));
router.get("/ping", (ctx) => (ctx.body = "PONG"));
router.get("/", (ctx) => (ctx.body = "Hi."));

export const routes = router.routes();
