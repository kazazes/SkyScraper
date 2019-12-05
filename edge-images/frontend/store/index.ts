import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"

@Module({
  name: "rootstore",
  stateFactory: true,
  namespaced: true
})
class RootStore extends VuexModule {
  edgeHostname = null;
  fileHostname = null;
  apiEndpoint = null;
  wsEndpoint = null;

  @Mutation
  setEdgeHostname (value) {
    this.edgeHostname = value
  }

  @Mutation
  setFileHostname (value) {
    this.fileHostname = value
  }

  @Mutation
  setApiEndpoint (value) {
    this.apiEndpoint = value
  }

  @Mutation
  setWsEndpoint (value) {
    this.wsEndpoint = value
  }

  @Action
  nuxtServerInit ({ commit, state }) {
    commit("setEdgeHostname", process.env.EDGE_HOSTNAME)
    commit("setFileHostname", process.env.FILE_HOSTNAME)
    commit("setApiEndpoint", process.env.API_ENDPOINT)
    commit(
      "setWsEndpoint",
      process.env.API_WS_ENDPOINT || `wss://${process.env.EDGE_HOSTNAME}/api/ws`
    )
    console.log(JSON.stringify(state, null, 2))
  }
}
