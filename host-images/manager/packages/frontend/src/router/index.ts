import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
import Meta from "vue-meta";

// Routes
import routes from "./paths";

Vue.use(Router);

// Create a new router
const router = new Router({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});

Vue.use(Meta);

export default router;
