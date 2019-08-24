export default function({ store, isDev }) {
  return {
    persisting: true,
    httpEndpoint: isDev
      ? `http://${process.env.EDGE_HOSTNAME}:4000/graphql`
      : `https://${process.env.EDGE_HOSTNAME}/graphql`,
    httpLinkOptions: {
      credentials: "same-origin",
    },
    wsEndpoint: isDev
      ? `ws://${process.env.EDGE_HOSTNAME}:4000/graphql`
      : `wss://${process.env.EDGE_HOSTNAME}/graphql`,
    websocketsOnly: false,
  };
}
