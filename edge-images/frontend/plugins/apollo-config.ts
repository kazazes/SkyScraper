export default {
  persisting: true,
  httpEndpoint:
    process.env.GRAPHQL_HTTP_ENDPOINT || "https://edge.sibyl.vision/graphql",
  httpLinkOptions: {
    credentials: "same-origin",
  },
  wsEndpoint:
    process.env.GRAPHQL_WS_ENDPOINT || "wss://edge.sibyl.vision/graphql",
  websocketsOnly: false,
};
