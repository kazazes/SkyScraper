export const state = () => ({
  edgeHostname: null,
  fileHostname: null,
  apiEndpoint: null,
  wsEndpoint: null,
});

export const mutations = {
  setEdgeHostname(state, value) {
    state.edgeHostname = value;
  },
  setFileHostname(state, value) {
    state.fileHostname = value;
  },
  setApiEndpoint(state, value) {
    state.apiEndpoint = value;
  },
  setWsEndpoint(state, value) {
    state.wsEndpoint = value;
  },
};

export const getters = {
  edgeHostname(state) {
    return state.edgeHostname;
  },
  fileHostname(state) {
    return state.fileHostname;
  },
  apiEndpoint(state) {
    return state.apiEndpoint;
  },
  wsEndpoint(state) {
    return state.wsEndpoint;
  },
};

export const actions = {
  nuxtServerInit({ commit, state }) {
    commit("setEdgeHostname", process.env.EDGE_HOSTNAME);
    commit("setFileHostname", process.env.FILE_HOSTNAME);
    commit("setApiEndpoint", process.env.API_ENDPOINT);
    commit(
      "setWsEndpoint",
      process.env.API_WS_ENDPOINT || `wss://${process.env.EDGE_HOSTNAME}/api/ws`
    );
  },
};
