export const state = () => ({
  edgeHostname: null,
  fileHostname: null,
});

export const mutations = {
  setEdgeHostname(state, value) {
    state.edgeHostname = value;
  },
  setFileHostname(state, value) {
    state.fileHostname = value;
    console.error(state);
  },
};

export const getters = {
  edgeHostname(state) {
    return state.edgeHostname;
  },
  fileHostname(state) {
    return state.fileHostname;
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    commit("setEdgeHostname", process.env.EDGE_HOSTNAME);
    commit("setFileHostname", process.env.FILE_HOSTNAME);
  },
};
