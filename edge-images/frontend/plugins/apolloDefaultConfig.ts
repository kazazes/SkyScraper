import { ApolloClientClientConfig } from "vue-cli-plugin-apollo/graphql-client";


export default function({store, isDev}){
  return {
    persisting: true,
    httpEndpoint: isDev
      ? "http://127.0.0.1:4000/graphql"
      : `https://${store.getters['edgeHostname']}/graphql`,
    httpLinkOptions: {
      credentials: "same-origin",
    },
    wsEndpoint: isDev
      ? "ws://127.0.0.1:4000/graphql"
      : `wss://${store.getters['edgeHostname']}/graphql`,
    websocketsOnly: false,
  }
}
