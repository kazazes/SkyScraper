import { InMemoryCache } from "apollo-cache-inmemory";

export default function({ store, isDev }) {
  const hostname = process.server
    ? process.env.EDGE_HOSTNAME
    : window.location.hostname;
  return {
    persisting: true,
    httpEndpoint: isDev
      ? "http://127.0.0.1:4000/graphql"
      : `https://${hostname}/graphql`,
    httpLinkOptions: {
      credentials: "same-origin",
    },
    wsEndpoint: isDev
      ? "ws://127.0.0.1:4000/graphql"
      : `wss://${hostname}/graphql`,
    websocketsOnly: false,
    cache: new InMemoryCache(),
  };
}
