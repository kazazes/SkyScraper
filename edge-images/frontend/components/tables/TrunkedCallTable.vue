<template>
  <div>
    <v-flex xs12 v-if="error">
      <v-alert :value="error" type="error">
        There was an error fetching that data.
        <v-card class="my-2">
          <v-card-text>{{ error }}</v-card-text>
        </v-card>
      </v-alert>
    </v-flex>
    <div class="result apollo">
      <v-card-text class="py-0">
        <template>
          <v-data-table
            :headers="headers"
            :rows-per-page-items="[25,50,100]"
            :loading="$apollo.loading"
            :items="trunkedCalls"
            :pagination.sync="pagination"
            class="elevation-3"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            sort-icon="mdi-menu-down"
          >
            <template v-slot:items="props">
              <tr
                :active="(!!selected && selected.id === props.item.id)"
                @click="$store.commit('trunked/setSelected', props.item)"
              >
                <td class="hidden-lg-and-down pl-4">{{ props.item.talkgroup.alphaTag }}</td>
                <td class="hidden-md-and-down pl-4">
                  <v-chip>{{ props.item.talkgroup.tag }}</v-chip>
                </td>
                <td>{{ props.item.talkgroup.description }}</td>
                <td>{{ timeAgo(props.item.startTime) }}</td>
                <td class="pr-4 hidden-sm-and-down">{{ props.item.duration.toFixed(0) + 's' }}</td>
                <td class="text-xs-center hidden-sm-and-down">
                  <v-icon
                    small
                    v-if="props.item.transcription && props.item.transcription.body"
                  >mdi-script-text-outline</v-icon>
                  <span v-else>
                    <moon-loader :size="16" style="margin: auto;"></moon-loader>
                  </span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-card-text>
    </div>
  </div>
</template>
<script lang="ts">
  import { MoonLoader } from "@saeris/vue-spinners";
  import consola from "consola";
  import moment from "moment";
  import Vue from "vue";
  import { Prop, Component } from "nuxt-property-decorator";
  import { Transcription, TrunkedCall } from "~/assets/gql.types";
  import { TRUNKED_CALLS } from "~/assets/apollo/queries/getTrunkedCalls";
  import { NEW_TRUNKED_CALLS } from "~/assets/apollo/subscriptions/newTrunkedCalls";
  import { NEW_TRANSCRIPTIONS } from "~/assets/apollo/subscriptions/transcriptions";

  @Component({
    name: "TrunkedCallTable",
    apollo: {
      trunkedCalls: {
        query: TRUNKED_CALLS,
        subscribeToMore: [
          {
            document: NEW_TRUNKED_CALLS,
            updateQuery(
              previousResult: { trunkedCalls: TrunkedCall[] },
              {
                subscriptionData,
              }: { subscriptionData: { data: { trunkedCalls: TrunkedCall } } }
            ): { trunkedCalls: TrunkedCall[] } {
              const newCall = subscriptionData.data.trunkedCalls;
              const t = this as any;
              const existingIdx = previousResult.trunkedCalls.findIndex(
                (c) => c.id === newCall.id
              );
              if (existingIdx !== -1) {
                t.$set(previousResult.trunkedCalls, existingIdx, newCall);
                return { trunkedCalls: previousResult.trunkedCalls };
              } else {
                if (t.realTimeQueueEmpty || !t.selected) {
                  t.$store.commit("trunked/setSelected", newCall);
                }
                return {
                  trunkedCalls: [newCall, ...previousResult.trunkedCalls],
                };
              }
            },
          },
          {
            document: NEW_TRANSCRIPTIONS,
            updateQuery(
              previousResult: { trunkedCalls: TrunkedCall[] },
              {
                subscriptionData,
              }: { subscriptionData: { data: { transcriptions: Transcription } } }
            ): { trunkedCalls: TrunkedCall[] } {
              const trans = subscriptionData.data.transcriptions;
              const existingIdx = previousResult.trunkedCalls.findIndex(
                (c) => c.id === trans.call.id
              );
              if (existingIdx !== -1) {
                const t = this as any;
                t.$set(
                  previousResult.trunkedCalls[existingIdx],
                  "transcription",
                  trans
                );
                return { trunkedCalls: previousResult.trunkedCalls };
              }
              return previousResult;
            },
          },
        ],
        variables() {
          const t = this as any;
          return {
            first: t.pagination.rowsPerPage,
            skip: t.page * t.rowsPerPage,
          };
        },
        update(data) {
          const t = this as any;
          t.$store.commit("trunked/setSelected", data.trunkedCalls[0]);

          return data.trunkedCalls;
        },
      },
    },
    components: { "moon-loader": MoonLoader },
    data() {
      return {
        error: undefined,
        columns: [
          {
            label: "Alpha Tag",
            field: "talkgroup.alphaTag",
          },
          {
            label: "",
            field: "talkgroup.tag",
          },
          {
            label: "Description",
            field: "talkgroup.description",
          },
          {
            label: "Time",
            field: "startTime",
            sortable: true,
          },
          {
            label: "Duration",
            field: "duration",
            formatFn: (val: string) => Number(val).toFixed(2) + "s",
          },
          {
            label: "Transcription",
            field: "transcription",
            class: "hidden-md-and-down",
          },
        ],
        headers: [
          {
            text: "Alpha Tag",
            value: "talkgroup.alphaTag",
            sortable: true,
            class: "hidden-lg-and-down pl-4",
          },
          {
            text: "",
            value: "talkgroup.tag",
            class: "hidden-md-and-down pl-2",
            sortable: true,
          },
          {
            text: "Description",
            value: "description",
            sortable: false,
          },
          {
            text: "Time",
            value: "startTime",
            sortable: true,
          },
          {
            text: "Duration",
            value: "duration",
            sortable: true,
            class: "hidden-sm-and-down",
          },
          {
            text: "Transcription",
            value: "transcription",
            sortable: false,
            class: "hidden-sm-and-down text-xs-center ",
          },
        ],
      };
    },
    props: {
      realTimeQueueEmpty: { default: false },
    },
  } as any)
  export default class TrunkedCallTable extends Vue {
    error: any = undefined;
    pagination = {
      descending: true,
      page: 1,
      rowsPerPage: 25,
      sortBy: "startTime",
    };
    trunkedCalls!: TrunkedCall[];

    get selected() {
      const stored = this.$store.getters["trunked/selected"];
      return stored;
    }

    @Prop({ required: true })
    realTimeQueueEmpty: boolean = false;

    protected apolloError(e: any) {
      consola.error(e);
      this.error = e;
    }

    onCallAdded(previousResult, { subscriptionData }) {
      const newCall = subscriptionData.data.trunkedCalls as TrunkedCall;
      // The previous result is immutable
      const newResult = {
        trunkedCalls: previousResult
          ? [newCall, ...previousResult.trunkedCalls]
          : ([] as TrunkedCall[]),
      };

      if (!newCall.id) debugger;
      newResult.trunkedCalls.push(newCall);
      return newResult;
    }

    onTranscriptionAdded(previousResult, { subscriptionData }) {
      const newTranscript = subscriptionData.data.transcriptions as Transcription;
      const calls = previousResult
        ? [...(previousResult.trunkedCalls as TrunkedCall[])]
        : ([] as TrunkedCall[]);
      const idx = calls.findIndex(
        (c: TrunkedCall) => c.id === newTranscript.call.id
      );
      if (idx === -1) {
        debugger;
        consola.warn("transcript but no call");
        return previousResult;
      }
      const copy = calls[idx];
      copy.transcription = newTranscript;

      // The previous result is immutable
      const newResult = {
        trunkedCalls: [copy, ...previousResult.trunkedCalls],
      };

      return newResult;
    }

    timeAgo(d: string) {
      return moment(d).fromNow();
    }

    protected voiceResults(result: { data: { trunkedCalls: TrunkedCall[] } }) {}
  }
</script>

<style scoped>
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

