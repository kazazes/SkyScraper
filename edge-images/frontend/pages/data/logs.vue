<template>
  <v-container fluid>
    <v-layout row align-start justify-start wrap>
      <v-flex>
        <v-card dark>
          <v-card-text style="overflow-y: scroll; height: 300px;">
            <p
              v-for="(gLog, i) in globalLogs"
              :key="'global'+i"
              v-html="formatDockerLog(gLog, true)"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(container) in containers" :key="container.id">
          <template v-slot:header>
            <v-flex>
              <v-icon
                v-if="container.visibleInGlobal"
                small
                @click.stop="toggleVisibleInGlobal(container.id)"
              >
                mdi-eye
              </v-icon>
              <v-icon v-else small @click.stop="toggleVisibleInGlobal(container.id)">
                mdi-eye-off
              </v-icon>
              <span v-text="container.image" />
            </v-flex>
          </template>
          <v-card dark>
            <v-card-text
              v-if="logsForContainer(container.id).length > 0"
              style="overflow-y: scroll; height: 300px;"
            >
              <p
                v-for="(log, i) in logsForContainer(container.id)"
                :key="container.id + i"
                v-html="formatDockerLog(log)"
              />
            </v-card-text>
            <v-card-text v-else>
              Waiting for logs...
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Watch } from "nuxt-property-decorator"
import moment from "moment"
const chroma = require("chroma-js")

  @Component({})
export default class LogViewer extends Vue {
    ws: WebSocket | undefined;

    get containers () {
      return this.$store.getters["docker/containers"]
    }

    get globalLogs () {
      const logs = this.$store.getters["docker/globalLogs"]
      const filtered = logs.filter((log) => {
        return this.containers[log.long_id].visibleInGlobal
      })
      return filtered
    }

    get containerColors () {
      const colors: { [key: string]: any } = {}
      Object.keys(this.containers).forEach((c: any) => {
        colors[c] = chroma.random().luminance(0.5)
      })
      return colors
    }

    logsForContainer (containerId: string) {
      return this.$store.state.docker.logs[containerId]
    }

    mounted () {
      this.$axios
        .get(`${this.$store.getters.apiEndpoint}/device/docker/containers`)
        .then((res) => {
          this.$store.commit("docker/setContainers", res.data)
        })
        .catch((e: any) => {
          console.error(e)
        })
      this.openLogWs()
    }

    private openLogWs () {
      const wsEndpoint = this.$store.getters.wsEndpoint
      this.ws = new WebSocket(`${wsEndpoint}/logs`)
      this.ws.onmessage = ({ data }) => {
        const d = JSON.parse(data)
        const id = d.long_id
        this.$store.commit("docker/pushLog", d)
      }
      this.ws.onerror = (ev: Event) => {
        console.error(`Websocket error: ${ev}`)
        return null
      }
    }

    beforeDestroy () {
      if (this.ws) { this.ws.close() }
    }

    formatDockerLog (log: any, global?: boolean) {
      const m = moment(log.time)
      let response = `<span class="font-weight-medium">${m.toISOString()}:</span> ${
        log.line
      }`
      if (global) {
        const color = this.containerColors[log.long_id]
        response = `<span class="font-weight-bold font-italic" style="color: ${color.hex()}">${
          log.name
        }</span> @ ${response}`
      }
      return response
    }

    toggleVisibleInGlobal (id: string) {
      this.$store.commit("docker/toggleVisibleInGlobal", id)
    }
}
</script>

<style scoped>
</style>
