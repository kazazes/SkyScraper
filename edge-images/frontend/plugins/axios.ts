import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}

export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    const t = store.getters["user/token"];
    if (t && t.length > 0) {
      config.headers.common.Authorization = t;
    }
  });
}
