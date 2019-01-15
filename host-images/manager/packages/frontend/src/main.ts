import Vue from "vue";

import "./components";
import "./plugins";
import { sync } from "vuex-router-sync";

// Application imports
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
// import { createProvider } from './vue-apollo'

// Sync store with router
sync(store, router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  // apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
