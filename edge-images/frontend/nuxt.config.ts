import webpack from "webpack";

const isDev = process.env.NODE_ENV !== "production";

const config = {
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
      {
        rel: "stylesheet",
        href: "https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [{ src: "~/assets/style/index.scss", lang: "scss" }],

  // css: ["~/assets/style/index.scss", "@mdi/font/css/materialdesignicons.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/segment", ssr: false },
    { src: "~/plugins/vuex-persist", ssr: false },
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/sentry",
    "@nuxtjs/axios",
    "@nuxtjs/vuetify",
    "@nuxtjs/apollo",
    "@nuxtjs/proxy",
    "@nuxtjs/localforage",
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
      default: {
        persisting: true,
        httpEndpoint:
          process.env.GRAPHQL_HTTP_ENDPOINT ||
          "https://edge.sibyl.vision/graphql",
        httpLinkOptions: {
          credentials: "same-origin",
        },
        wsEndpoint:
          process.env.GRAPHQL_WS_ENDPOINT || "wss://edge.sibyl.vision/graphql",
        websocketsOnly: false,
      },
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
    plugins: [
      new webpack.ProvidePlugin({
        mapboxgl: "mapbox-gl",
      }),
    ],
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
};

export default config;
