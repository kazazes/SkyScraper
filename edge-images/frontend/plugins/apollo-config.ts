export default {
  persisting: true,
    httpEndpoint:
  process.env.GRAPHQL_HTTP_ENDPOINT ||
  process.env.NODE_ENV === "production"
    ? "https://edge.sibyl.vision/graphql" :
    "http://127.0.0.1:4000/graphql"
    ,
    httpLinkOptions: {
    credentials: "same-origin",
  },
  wsEndpoint:
    process.env.GRAPHQL_WS_ENDPOINT ||
    process.env.NODE_ENV === "production"
      ? "wss://edge.sibyl.vision/graphql" :
      "ws://127.0.0.1:4000/graphql",
      websocketsOnly: false,
}
