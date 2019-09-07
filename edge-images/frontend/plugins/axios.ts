import { NuxtAxiosInstance } from "@nuxtjs/axios";

declare module "@nuxt/types" {
  interface Context {
    $axios: NuxtAxiosInstance;
  }
}

export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    if (app.$auth.loggedIn) {
      const t = app.$auth.getToken("auth0");
      if (t) {
        config.headers.common.Authorization = t;
      }
    }
  });
}
