import webpack from "webpack";
import NuxtConfiguration from "@nuxt/config";
import apolloDefaultConfig from "./plugins/apolloDefaultConfig";

const isDev = process.env.NODE_ENV !== "production";

const config: NuxtConfiguration = {
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
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  env: {
    EDGE_HOSTNAME: process.env.EDGE_HOSTNAME as string
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/index.scss"],

  // css: ["~/assets/style/index.scss", "@mdi/font/css/materialdesignicons.css"],
  /*
   ** Plugins to load before mounting the App
   */
  // plugins: [{ src: "~/plugins/segment", ssr: false }],
  /*
   ** Nuxt.js modules
   */
  modules: isDev
    ? [
        "@nuxtjs/axios",
        "@nuxtjs/vuetify",
        "@nuxtjs/apollo",
        "@nuxtjs/proxy",
        "@nuxtjs/pwa",
        [
          "nuxt-validate",
          {
            lang: "en",
          },
        ],
      ]
    : [
        "@nuxtjs/sentry",
        "@nuxtjs/axios",
        "@nuxtjs/vuetify",
        "@nuxtjs/apollo",
        "@nuxtjs/proxy",
        "@nuxtjs/pwa",
        [
          "@nuxtjs/robots",
          {
            UserAgent: "*",
            Disallow: "/",
          },
        ],
        [
          "nuxt-validate",
          {
            lang: "en",
          },
        ],
      ],
  sentry: {
    dsn: "https://e9967cc714ae43d6965c8c364e83f49f@sentry.io/1513897",
    config: {}, // Additional config
  },
  axios: {},
  apollo: {
    incldueNodeModules: true,
    clientConfigs: {
      default: apolloDefaultConfig(),
    },
  },
  vuetify: {
    materialIcons: false,
    theme: {
      primary: "#2c303a",
    },
    customProperties: true,
    iconfont: "mdi",
  },
  build: {
    devtools: true,
    transpile: [/^vuetify/],
    extend(config, ctx) {
      // https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
  },
  vue: {
    config: {
      productionTip: false,
      devtools: isDev,
      performance: isDev,
    },
  },
};

export default config;
