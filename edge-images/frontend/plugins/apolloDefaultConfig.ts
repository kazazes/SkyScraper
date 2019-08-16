const server = `${process.env.EDGE_HOSTNAME}/graphql`;

export default () => {
  const isDev = process.env.NODE_ENV !== "production";

  return {
    persisting: true,
    httpEndpoint: isDev
      ? "http://127.0.0.1:4000/graphql"
      : `https://edge.sibyl.vision/graphql`,
    httpLinkOptions: {
      credentials: "same-origin",
    },
    wsEndpoint: isDev
      ? "ws://127.0.0.1:4000/graphql"
      : `wss://edge.sibyl.vision/graphql`,
    websocketsOnly: false,
  };
};
