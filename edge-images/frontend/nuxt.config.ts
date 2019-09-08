import { Configuration, Plugin } from "@nuxt/types";
import webpack from "webpack";

const isDev = process.env.NODE_ENV !== "production";

const config: Configuration = {
  /*
   ** Headers of the page
   */
  meta: {
    mobileAppIOS: true,
    theme_color: "#010015",
    lang: "en",
    ogSiteName: "SkyScraper Edge",
    nativeUI: true,
  },
  head: {
    title: "SkyScraper",
    titleTemplate: (t) => t + ' | SkyScraper',
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

  // css: ["~/assets/style/index.scss", "@mdi/font/css/materialdesignicons.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/vee-validate" }, { src: "~/plugins/axios" }],
  /*
   ** Nuxt.js modules
   */
  buildModules: ["@nuxt/typescript-build"],
  modules: [
    "@nuxtjs/sentry",
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
    "@nuxtjs/proxy",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
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
  apollo: {
    incldueNodeModules: true,
    clientConfigs: {
      default: "~/plugins/apolloDefaultConfig.ts",
    },
    defaultOptions: {
      $query: {
        loadingKey: "loading",
        fetchPolicy: "cache-and-network",
      },
    },
  },
  vuetify: {
    materialIcons: false,
    theme: {
      primary: "#C62828",
      accent: "#673AB7",
    },
    customProperties: true,
    iconfont: "mdi",
    treeShake: !isDev,
  },
  build: {
    transpile: [/^vuetify/],
    extend(config, ctx) {
      // https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /en/
      ) as Plugin,
    ],
  },
  vue: {
    config: {
      productionTip: false,
      devtools: isDev,
      performance: isDev,
    },
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true,
  },
  auth: {
    strategies: {
      auth0: {
        domain: "skyscraper.auth0.com",
        client_id: "Uaz6l2GikGK9BuRoXAK7L7jGPmVNYMSB",
        audience: "edge.sibyl.vision",
      },
    },
  },
};

export default config;
