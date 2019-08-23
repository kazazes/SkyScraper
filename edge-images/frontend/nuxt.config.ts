import NuxtConfiguration from "@nuxt/config";
import apolloDefaultConfig from "./plugins/apolloDefaultConfig";
import webpack from "webpack";

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
  // plugins: [{ src: "~/plugins/segment", ssr: false }],
  /*
   ** Nuxt.js modules
   */
  buildModules: ["@nuxt/typescript-build"],
  modules: isDev
    ? [
        "@nuxtjs/axios",
        "@nuxtjs/vuetify",
        "@nuxtjs/apollo",
        "@nuxtjs/proxy",
        "@nuxtjs/pwa",
        [
          "@nuxtjs/dotenv",
          {
            systemVars: true,
            only: ["EDGE_HOSTNAME", "FILE_HOSTNAME", "NODE_ENV"],
          },
        ],
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
        [
          "@nuxtjs/dotenv",
          {
            systemVars: true,
            only: ["EDGE_HOSTNAME", "FILE_HOSTNAME", "NODE_ENV"],
          },
        ],
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
    devtools: true,
    transpile: [/^vuetify/],
    extend(config, ctx) {
      // https://medium.com/js-dojo/debugging-nuxt-js-with-vs-code-60a1a9e75cf6
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    },
    plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/)],
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
};

export default config;
