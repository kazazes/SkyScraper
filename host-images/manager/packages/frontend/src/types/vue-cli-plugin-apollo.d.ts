declare module 'vue-cli-plugin-apollo/src/components/index' {
  export {}
}
declare module 'vue-cli-plugin-apollo/src/plugins/axios' {
  export {}
}
declare module 'vue-cli-plugin-apollo/src/plugins/chartist' {
  import 'chartist/dist/chartist.min.css'
}

declare module 'vue-cli-plugin-apollo/graphql-client' {
  import { ApolloCache } from 'apollo-cache'
  import {
    InMemoryCacheConfig,
    NormalizedCacheObject
  } from 'apollo-cache-inmemory'
  import { ApolloClient, ApolloClientOptions } from 'apollo-client'
  import {
    ApolloLink,
    FetchResult,
    NextLink,
    Observable,
    Operation
  } from 'apollo-link'
  import { HttpOptions, UriFunction } from 'apollo-link-http-common'
  import { ClientStateConfig } from 'apollo-link-state'
  import { SubscriptionClient } from 'subscriptions-transport-ws'
  export interface CreateApolloClientOptions<
    TCacheShape = NormalizedCacheObject
  > {
    httpEndpoint?: string | UriFunction | undefined;
    wsEndpoint?: string | null;
    tokenName?: string;
    persisting?: boolean;
    ssr?: boolean;
    websocketsOnly?: boolean;
    link?: ApolloLink | null;
    defaultHttpLink?: boolean;
    httpLinkOptions?: HttpOptions;
    cache?: ApolloCache<TCacheShape> | null;
    inMemoryCacheOptions?: InMemoryCacheConfig | null;
    apollo?: ApolloClientOptions<TCacheShape>;
    clientState?: ClientStateConfig | null;
    getAuth?: (tokenName: string) => string | undefined;
  }
  export interface CreatedApolloClient<TCacheShape = NormalizedCacheObject> {
    apolloClient: ApolloClient<TCacheShape> & {
      wsClient?: SubscriptionClient;
    };
    wsClient?: SubscriptionClient;
    stateLink?: {
      writeDefaults(): void;
      request(
        operation: Operation,
        forward?: NextLink
      ): Observable<FetchResult<Record<string, any>, Record<string, any>>>;
      split(
        test: (op: Operation) => boolean,
        left:
          | ApolloLink
          | ((
              operation: Operation,
              forward?: NextLink
            ) => Observable<
              FetchResult<Record<string, any>, Record<string, any>>
            >),
        right?:
          | ApolloLink
          | ((
              operation: Operation,
              forward?: NextLink
            ) => Observable<
              FetchResult<Record<string, any>, Record<string, any>>
            >)
      ): ApolloLink;
      concat(
        next:
          | ApolloLink
          | ((
              operation: Operation,
              forward?: NextLink
            ) => Observable<
              FetchResult<Record<string, any>, Record<string, any>>
            >)
      ): ApolloLink;
    };
  }
  export function createApolloClient<TCacheShape = NormalizedCacheObject>({
    httpEndpoint,
    wsEndpoint,
    tokenName,
    persisting,
    ssr,
    websocketsOnly,
    link,
    defaultHttpLink,
    httpLinkOptions,
    cache,
    inMemoryCacheOptions,
    apollo,
    clientState,
    getAuth
  }: CreateApolloClientOptions<TCacheShape>): CreatedApolloClient<TCacheShape>;
  export function restartWebsockets(wsClient: SubscriptionClient): void;
}

declare module 'vue-cli-plugin-apollo/src/plugins/theme' {
  const _default: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    error: string;
    info: string;
    success: string;
    warning: string;
  }
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/plugins/vuetify' {
  import 'vuetify/dist/vuetify.min.css'
  import '@mdi/font/css/materialdesignicons.css'
}
declare module 'vue-cli-plugin-apollo/src/plugins/index' {
  import 'vue-cli-plugin-apollo/src/plugins/axios'
  import 'vue-cli-plugin-apollo/src/plugins/chartist'
  import 'vue-cli-plugin-apollo/src/plugins/vuetify'
}
declare module 'vue-cli-plugin-apollo/src/router/paths' {
  const _default: (
    | {
        path: string;
        view: string;
        name?: undefined;
      }
    | {
        path: string;
        name: string;
        view: string;
      })[]
  /**
   * Define all of your application routes here
   * for more information on routes, see the
   * official documentation https://router.vuejs.org/en/
   */
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/store/actions' {
  const _default: {}
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/store/getters' {
  const _default: {}
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/store/modules/index' {
  const modules: any
  export default modules
}
declare module 'vue-cli-plugin-apollo/src/store/mutations' {
  const _default: {}
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/store/state' {
  const _default: {}
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/vue-apollo' {
  import VueApollo from 'vue-apollo'
  export function createProvider(options?: {}): VueApollo;
  export function onLogin(
    apolloClient: {
      wsClient: any;
      resetStore: () => void;
    },
    token: string
  ): Promise<void>;
  export function onLogout(apolloClient: {
    wsClient: any;
    resetStore: () => void;
  }): Promise<void>;
}
declare module 'vue-cli-plugin-apollo/src/main' {
  import 'vue-cli-plugin-apollo/src/components'
  import 'vue-cli-plugin-apollo/src/plugins'
}
declare module 'vue-cli-plugin-apollo/src/store/modules/app/mutations' {
  const _default: {
    setDrawer: (
      state: {
        [x: string]: any;
      },
      payload: any
    ) => any;
    setImage: (
      state: {
        [x: string]: any;
      },
      payload: any
    ) => any;
    setColor: (
      state: {
        [x: string]: any;
      },
      payload: any
    ) => any;
    toggleDrawer: (
      state: {
        [x: string]: any;
      }
    ) => boolean;
  }
  export default _default
}
declare module 'vue-cli-plugin-apollo/src/store/modules/app/state' {
  const _default: {
    drawer: null;
    color: string;
    image: string;
  }
  export default _default
}
