import Dashboard from "@/views/Dashboard.vue";
import TrunkedApp from "@/views/TrunkedApp.vue";
import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/app/trunked",
    component: TrunkedApp
  }
];

export default routes;
