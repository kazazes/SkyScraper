<template>
  <v-container
    id="trunked_data"
    fill-height
    row
    wrap
    align-center
    justify-center
    xl12
    d-flex
    pa-0
    grid-list-xs
  >
    <v-layout row align-start justify-start wrap>
      <v-flex text-xs-center mt-3>
        <v-btn-toggle v-model="toggleAutoPlay">
          <v-btn color="red lighten-2">
            <v-icon class="my-2">mdi-numeric-1</v-icon>
          </v-btn>
          <v-btn color="red lighten-2">
            <v-icon>mdi-update</v-icon>&nbsp;Real time
          </v-btn>
          <!-- <v-btn color="red lighten-2">
            <v-icon>mdi-access-point</v-icon>&nbsp;Live
          </v-btn>-->
        </v-btn-toggle>
      </v-flex>
      <v-flex xs12 py-2>
        <TrunkedCallCard
          v-on:play-live-audio="playLiveAudio"
          v-on:play-next-audio="playRealtimeAudio"
          v-on:player-state-pause="playerStatePause"
          v-on:player-state-ended="playerStateEnded"
          :selected="selected"
          :toggleAutoPlay="toggleAutoPlay"
        />
      </v-flex>
      <v-flex>
        <TrunkedCallTable
          v-on:selection-changed="$forceUpdate()"
          v-on:trunked-calls-updated="trunkedCallsUpdated"
          :real-time-queue-empty="realTimeQueueEmpty"
        ></TrunkedCallTable>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "nuxt-property-decorator";
  import { TrunkedCall } from "~/types/gql.types";
  import TrunkedCallTable from "~/components/tables/TrunkedCallTable.vue";
  import TrunkedCallCard from "~/components/cards/TrunkedCallCard.vue";
  import { toggleAutoPlay } from "~/utils/enums";

  @Component({
    name: "TrunkedVoiceData",
    components: {
      TrunkedCallTable,
      TrunkedCallCard,
    },
    head: {
      title: "Trunked System | SkyScraper",
    },
  })
  export default class TrunkedVoiceData extends Vue {
    protected error: any = false;
    protected toggleAutoPlay: toggleAutoPlay = 0;
    protected returnedCalls: any[] = [];
    protected paused = true;
    realTimeQueueEmpty: boolean = false;
    trunkedCalls: TrunkedCall[] = [];

    get selected() {
      return this.$store.getters["trunkedPlayer/selected"];
    }

    protected playLiveAudio() {
      this.$store.commit("trunkedPlayer/setSelected", this.trunkedCalls[0]);
    }

    protected trunkedCallsUpdated(calls: TrunkedCall[]) {
      this.trunkedCalls = calls;
    }

    protected playRealtimeAudio() {
      const current = this.trunkedCalls.findIndex((call: any, idx: number) => {
        if (call.id === this.selected.id) return true;
      });
      const next = current - 1;
      if (current - 1 > 0) {
        this.$store.commit("trunkedPlayer/setSelected", this.trunkedCalls[next]);
        this.realTimeQueueEmpty = false;
      } else {
        this.realTimeQueueEmpty = true;
      }
    }

    protected playerStatePause(isPaused: Boolean) {
      this.paused = isPaused.valueOf();
    }

    protected playerStateEnded(isEnded: Boolean) {
      const auto = this.toggleAutoPlay as toggleAutoPlay;
      switch (auto) {
        case toggleAutoPlay.LIVE:
          this.playLiveAudio();
        case toggleAutoPlay.REALTIME:
          this.playRealtimeAudio();
        default:
          break;
      }
    }
  }
</script>

<style scoped>
  .monospaced {
    font-family: Courier, monospace;
  }

  table.v-table tbody td:first-child {
    padding: 9px 8px;
  }

  table.v-table tbody td {
    font-size: 12px;
  }

  .v-chip {
    font-size: 11px;
  }

  tr.active {
    background-color: aqua;
  }
</style>

