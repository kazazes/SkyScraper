import webpack from "webpack";

import apolloConfig from "./plugins/apollo-config";

const isDev = process.env.NODE_ENV !== "production";

const config = {
  mode: "universal",
  modern: isDev ? false : "client",
  /*
   ** Headers of the page
   */
  head: {
    title: "Admin | SkyScraper",
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
  axios: {},
  apollo: {
    incldueNodeModules: true,
    clientConfigs: {
      default: apolloConfig,
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
    parallel: true,
  },
};

export default config;
