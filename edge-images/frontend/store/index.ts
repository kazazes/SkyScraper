export const state = () => ({
  edgeHostname: null
})

export const mutations = {
  setEdgeHostname(state, value) {
    state.edgeHostname = value
  }
}

export const getters = {
  edgeHostname(state) {
    return state.edgeHostname;
  }
}

export const actions = {
  nuxtServerInit({ commit }) {
    commit('setEdgeHostname', process.env.EDGE_HOSTNAME)
  }
}
