import { Configuration } from "@nuxt/types";
import webpack from "webpack";

const isDev = process.env.NODE_ENV !== "production";

const config: Configuration = {
  /*
   ** Headers of the page
   */
  head: {
    title: "SkyScraper",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Admin | SkyScraper",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/index.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vee-validate" }, { src: "~/plugins/axios" }],
  /*
   ** Nuxt.js modules
   */
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/axios",
    [
      "@nuxtjs/dotenv",
      {
        systemVars: true,
        only: [
          "EDGE_HOSTNAME",
          "FILE_HOSTNAME",
          "NODE_ENV",
          "API_ENDPOINT",
          "API_WS_ENDPOINT",
        ],
      },
    ],
    "@nuxtjs/vuetify",
    "@nuxtjs/apollo",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    [
      "nuxt-validate",
      {
        lang: "en",
      },
    ],
  ],
  apollo: {
    incldueNodeModules: true,
    clientConfigs: {
      default: "~/plugins/apolloDefaultConfig.ts",
    },
  },
  vuetify: {
    materialIcons: false,
    theme: {
      primary: "#2c303a",
    },
    customProperties: true,
    iconfont: "mdi",
    treeShake: !isDev,
  },
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/) as any,
    ],
  },
  typescript: {
    typeCheck: true,
  },
  auth: {
    strategies: {
      local: false,
      auth0: {
        domain: "skyscraper.auth0.com",
        client_id: "Uaz6l2GikGK9BuRoXAK7L7jGPmVNYMSB",
        audience: "edge.sibyl.vision",
      },
    },
  },
};

export default config;
