<template>
  <v-layout row :class="$vuetify.breakpoint.mdAndDown ? 'wrap' : ''">
    <v-flex class="primary lighten-1" sm12 md4 lg3 xl2 xs12 elevation-5>
      <v-container pa-4>
        <v-layout justify-start align-center column>
          <v-flex py-2>
            <v-btn-toggle v-model="toggleAutoPlay" dark>
              <v-btn color="red lighten-2">
                <v-icon class="my-2">mdi-numeric-1</v-icon>
              </v-btn>
              <v-btn color="red lighten-2">
                <v-icon>mdi-update</v-icon>&nbsp;Real time
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-flex>
            <v-select
              class="pt-4"
              dark
              :items="trunkedSystems"
              item-text="name"
              item-value="shortName"
              @change="selectedSystemChanged"
              :value="selectedSystem"
              :loading="$apollo.loading"
              label="System"
            ></v-select>
          </v-flex>

          <v-flex grow style="width: 100%;" pt-3 hidden-md-and-down>
            <v-list dense subheader dark class="primary">
              <v-subheader>
                <v-flex grow>
                  <span>Groups - {{talkgroupTags.length}}</span>
                </v-flex>
                <v-flex>
                  <v-btn @click="expandGroups = !expandGroups" small block flat>
                    <span v-if="!expandGroups">Show All</span>
                    <span v-else>Collapse</span>
                  </v-btn>
                </v-flex>
              </v-subheader>
              <v-list-tile
                avatar
                v-for="(group, idx) in talkgroupTags"
                :key="group.tag + group.enabled"
                v-show="expandGroups || idx <= 5"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-text="group.tag"></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="pl-4">
                  <v-switch color="red lighten-2" v-model="talkgroupTags[idx].enabled" s></v-switch>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>
                  <v-btn @click="expandGroups = !expandGroups" small block flat>
                    <span v-if="!expandGroups">Show All</span>
                    <span v-else>Collapse</span>
                  </v-btn>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-container
      id="trunked_data"
      fill-height
      row
      wrap
      align-center
      justify-center
      xl12
      d-flex
      grid-list-xs
      pt-2
    >
      <v-layout row align-start justify-start wrap>
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
        <v-flex pt-2>
          <TrunkedCallTable
            v-on:selection-changed="$forceUpdate()"
            v-on:trunked-calls-updated="trunkedCallsUpdated"
            :real-time-queue-empty="realTimeQueueEmpty"
            :system="$route.params.system"
            :talkgroupTags="talkgroupTags"
          ></TrunkedCallTable>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>
<script lang="ts">
  import { Component, Watch, Vue } from "nuxt-property-decorator";
  import { TrunkedCall, TrunkedSystem } from "~/types/gql.types";
  import TrunkedCallTable from "~/components/tables/TrunkedCallTable.vue";
  import TrunkedCallCard from "~/components/cards/TrunkedCallCard.vue";
  import { toggleAutoPlay } from "~/utils/enums";
  import { TRUNKED_SYSTEMS } from "~/assets/apollo/queries/getTrunkedSystems";
  import { zip } from "lodash";

  @Component({
    components: {
      TrunkedCallTable,
      TrunkedCallCard,
    },
    head: {
      title: "Trunked System | SkyScraper",
    },
    apollo: {
      trunkedSystems: {
        query: TRUNKED_SYSTEMS,
      },
    },
    data() {
      return {
        error: false,
        toggleAutoPlay: 0,
        returnedCalls: [],
        paused: true,
        realTimeQueueEmpty: false,
        trunkedCalls: [],
        trunkedSystems: [],
        selectedSystem: "Select a system",
        expandGroups: false,
      };
    },
  })
  export default class TrunkedVoiceData extends Vue {
    protected error: any = false;
    protected toggleAutoPlay: toggleAutoPlay = 0;
    protected returnedCalls: any[] = [];
    protected paused = true;
    realTimeQueueEmpty: boolean = false;
    trunkedCalls: TrunkedCall[] = [];
    trunkedSystems: Partial<TrunkedSystem>[] = [];
    selectedSystem: string = "Select a system";
    expandGroups = false;
    talkgroupTags: { tag: string; enabled: boolean }[] = [];

    @Watch("trunkedSystems")
    trunkedSystemsUpdated() {
      this.setTalkgroupTags();
      if (!this.$route.params.system) {
        if (this.trunkedSystems.length === 1 && this.trunkedSystems[0]) {
          const shortName = this.trunkedSystems[0].shortName as string;
          this.gotoSystem(shortName);
        }
      } else {
        this.selectedSystem = this.$route.params.system;
      }
    }

    selectedSystemChanged(shortName: string) {
      this.gotoSystem(shortName);
    }

    gotoSystem(shortName: string) {
      this.$router.replace(`/data/trunked/${shortName}`);
    }

    get selected() {
      return this.$store.getters["trunked/selected"];
    }

    protected playLiveAudio() {
      this.$store.commit("trunked/setSelected", this.trunkedCalls[0]);
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
        this.$store.commit("trunked/setSelected", this.trunkedCalls[next]);
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

    setTalkgroupTags() {
      const tags: string[] = [];
      const sel = this.trunkedSystems.find(
        (s) => s.shortName === this.$route.params.system
      );
      if (sel && sel.talkgroups) {
        sel.talkgroups.forEach((tg) => {
          const tag = tg.tag;
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      } else {
        this.trunkedSystems.forEach((sys) => {
          if (!sys.talkgroups) return;
          sys.talkgroups.forEach((tg) => {
            const tag = tg.tag;
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
          });
        });
      }

      this.talkgroupTags = tags.sort().map((tag) => {
        return { tag, enabled: true };
      });
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

