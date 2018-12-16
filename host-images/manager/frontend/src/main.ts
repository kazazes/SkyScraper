import "@fortawesome/fontawesome-free/css/all.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push("/");
  },
  render: (h) => h(App)
}).$mount("#app");
