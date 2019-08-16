import { ApolloClientClientConfig } from "vue-cli-plugin-apollo/graphql-client";

export default () => {
  const isDev = process.env.NODE_ENV !== "production";

  const config: ApolloClientClientConfig = {
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

  return config;
};
