import { InMemoryCache } from "apollo-cache-inmemory";

export default function({ store, isDev }) {
  const hostname = process.server
    ? process.env.EDGE_HOSTNAME
    : window.location.hostname;

  const cache = new InMemoryCache();

  // If on the client, recover the injected state
  if (!process.server) {
    if (typeof window !== "undefined") {
      const state = (window as any).__APOLLO_STATE__;
      if (state) {
        // If you have multiple clients, use `state.<client_id>`
        cache.restore(state.defaultClient);
      }
    }
  }

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
    cache,
  };
}
