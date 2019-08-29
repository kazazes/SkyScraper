import Vue from "vue";
import VueNativeWebsocket from "vue-native-websocket";

export default function({ env }) {
  Vue.use(VueNativeWebsocket, env.API_WS_ENDPOINT, {
    format: "json",
    connectManually: true,
  });
}
