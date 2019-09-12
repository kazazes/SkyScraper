import Router from "koa-router";
import location from "../../util/deviceLocation";
import docker from "./docker";

const router = new Router();

router.get("/location", async (ctx) => {
  ctx.body = await location();
});

router.use("/docker", docker);

export default router.routes();
