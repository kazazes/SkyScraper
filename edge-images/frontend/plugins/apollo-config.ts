export default {
  connectToDevTools: true,
  persisting: true,
    httpEndpoint:
  process.env.GRAPHQL_HTTP_ENDPOINT ||
    "https://edge.sibyl.vision/graphql"
    ,
  wsEndpoint:
    process.env.GRAPHQL_WS_ENDPOINT ||
 "wss://edge.sibyl.vision/graphql"
}
