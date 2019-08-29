import Vue from "vue";
import VueNativeWebsocket from "vue-native-websocket";

Vue.use(VueNativeWebsocket, process.env.API_ENDPOINT, {
  format: "json",
  connectManually: true,
});
