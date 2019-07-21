import Router from "koa-router";
import location from "../../../util/deviceLocation";

const router = new Router();

router.get("/location", async ctx => {
  ctx.body = await location();
});

export default router.routes();
