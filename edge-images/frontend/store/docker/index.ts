interface DockerState {
  containers: {
    [key: string]: { id: string; visibleInGlobal: boolean; [key: string]: any };
  };
  logs: { [key: string]: any[] };
  globalLogs: any[];
}

export const state = (): DockerState => ({
  containers: {},
  logs: {},
  globalLogs: []
})

export const mutations = {
  setContainers (state: DockerState, containers: any[]) {
    const zipped = {}
    containers.forEach((c) => {
      state.logs[c.id] = []
      c.visibleInGlobal = true
      zipped[c.id] = c
    })

    state.containers = zipped
  },
  pushLog (state: DockerState, logItem: any) {
    const log = state.logs[logItem.long_id] as any[]
    if (log.length >= 100) {
      log.pop()
    }

    if (state.globalLogs.length >= 1000) {
      state.globalLogs.pop()
    }

    state.logs[logItem.long_id] = [logItem, ...log]
    state.globalLogs = [logItem, ...state.globalLogs]
  },
  toggleVisibleInGlobal (state: DockerState, id: string) {
    state.containers[id].visibleInGlobal = !state.containers[id]
      .visibleInGlobal
  }
}

export const getters = {
  containers: (state: DockerState) => {
    return state.containers
  },
  logsForContainer: (state: DockerState, containerId: string) => {
    return state.logs[containerId]
  },
  globalLogs: (state: DockerState) => {
    return state.globalLogs
  }
}
