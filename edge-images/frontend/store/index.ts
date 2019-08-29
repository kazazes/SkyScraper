export const state = () => ({
  edgeHostname: null,
  fileHostname: null,
  apiEndpoint: null,
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
};

export const actions = {
  nuxtServerInit({ commit }) {
    commit("setEdgeHostname", process.env.EDGE_HOSTNAME);
    commit("setFileHostname", process.env.FILE_HOSTNAME);
    commit("setApiEndpoint", process.env.API_ENDPOINT);
  },
};
