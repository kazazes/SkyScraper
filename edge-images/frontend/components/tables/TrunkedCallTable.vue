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
            :loading="$apollo.loading"
            :headers="headers"
            :rows-per-page-items="[10,25,50]"
            :items="trunkedCalls"
            :pagination.sync="pagination"
            :total-items="pagination.totalItems"
            class="elevation-3"
          >
            <v-progress-linear v-slot:progress indeterminate></v-progress-linear>
            <template v-slot:items="props">
              <tr
                :active="(!!selected && selected.id === props.item.id)"
                @click="$store.commit('trunked/setSelected', props.item)"
              >
                <td class="hidden-lg-and-down pl-4">{{ props.item.talkgroup.alphaTag }}</td>
                <td class="hidden-md-and-down pl-4">
                  <v-chip small>{{ props.item.talkgroup.tag }}</v-chip>
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
  import gql from "graphql-tag";
  import moment from "moment";
  import { Component, Prop, Watch, Vue } from "nuxt-property-decorator";
  import { TRUNKED_CALLS } from "~/assets/apollo/queries/getTrunkedCalls";
  import { NEW_TRUNKED_CALLS } from "~/assets/apollo/subscriptions/newTrunkedCalls";
  import {
    Transcription,
    TrunkedCall,
    TrunkedCallOrderByInput,
  } from "~/types/gql.types";

  @Component({
    name: "TrunkedCallTable",
    apollo: {
      trunkedCalls: {
        query: TRUNKED_CALLS,
        subscribeToMore: [
          {
            document: NEW_TRUNKED_CALLS,
            variables() {
              const t = this as any;
              return {
                where: {
                  node: {
                    system: { shortName: t.$route.params.system },
                    talkgroup: { tag_not_in: t.disabledTags() },
                  },
                },
              };
            },
            updateQuery(
              previousResult: { trunkedCalls: TrunkedCall[] },
              {
                subscriptionData,
              }: { subscriptionData: { data: { trunkedCalls: TrunkedCall } } }
            ): { trunkedCalls: TrunkedCall[] } {
              const newCall = subscriptionData.data.trunkedCalls;
              const t = this as any;
              const existingIdx = previousResult
                ? previousResult.trunkedCalls.findIndex(
                    (c) => c.id === newCall.id
                  )
                : -1;
              if (newCall.id === t.selected.id) {
                t.$store.commit(
                  "trunked/setSelectedTranscription",
                  newCall.transcription
                );
              }
              if (existingIdx !== -1) {
                // update existing
                t.$set(previousResult.trunkedCalls, existingIdx, newCall);
                return { trunkedCalls: previousResult.trunkedCalls };
              } else {
                // create new
                t.trunkedCallCount++;
                if (t.realTimeQueueEmpty || !t.selected) {
                  t.$store.commit("trunked/setSelected", newCall);
                }
                if (
                  previousResult.trunkedCalls &&
                  Array.isArray(previousResult.trunkedCalls) &&
                  previousResult.trunkedCalls.length >= t.pagination.rowsPerPage
                ) {
                  previousResult.trunkedCalls.pop();
                }

                if (t.pagination.page == 1) {
                  return {
                    trunkedCalls: [newCall, ...previousResult.trunkedCalls],
                  };
                } else {
                  return previousResult;
                }
              }
            },
          },
        ],
        variables() {
          const t = this as any;
          return {
            first: t.pagination.rowsPerPage,
            skip: (t.pagination.page - 1) * t.pagination.rowsPerPage,
            orderBy: TrunkedCallOrderByInput.StartTimeDesc,
            where: {
              system: { shortName: t.$route.params.system },
              talkgroup: { tag_not_in: t.disabledTags() },
            },
          };
        },
        update(data) {
          const t = this as any;
          if (!t.selected && data.trunkedCalls) {
            t.$store.commit("trunked/setSelected", data.trunkedCalls[0]);
          }

          return data.trunkedCalls;
        },
      },
      trunkedCallCount: {
        query: gql`
          query trunkedCallCount {
            trunkedCallCount
          }
        `,
        update({ trunkedCallCount }) {
          const t = this as any;
          t.pagination.totalItems = trunkedCallCount;
          return trunkedCallCount;
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
            class: "hidden-lg-and-down pl-4",
            sortable: false,
          },
          {
            text: "",
            value: "talkgroup.tag",
            class: "hidden-md-and-down pl-2",
            sortable: false,
          },
          {
            text: "Description",
            value: "description",
            sortable: false,
          },
          {
            text: "Time",
            value: "startTime",
            sortable: false,
          },
          {
            text: "Duration",
            value: "duration",
            sortable: false,
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
      realTimeQueueEmpty: { default: false, required: true },
      talkgroupTags: { required: true },
    },
  } as any)
  export default class TrunkedCallTable extends Vue {
    error: any = undefined;
    trunkedCallCount = 0;
    trunkedCalls!: TrunkedCall[];

    @Prop()
    system?: string;

    @Prop({ required: true })
    talkgroupTags!: { tag: string; enabled: boolean }[];

    @Watch("trunkedCalls", { deep: true })
    emitTrunkedCalls() {
      this.$emit("trunked-calls-updated", this.trunkedCalls);
    }

    @Watch("talkgroupTags", { deep: true })
    tagSelectionChanged() {}

    pagination = {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      sortBy: "startTime",
      totalItems: 0,
    };

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

    timeAgo(d: string) {
      return moment(d).format('lll');
    }

    disabledTags() {
      const disabled = this.talkgroupTags
        .filter((tag) => {
          return !tag.enabled;
        })
        .map((tag) => tag.tag);
      return disabled;
    }
  }
</script>

<style>
  table.v-table tbody td:first-child {
    padding: 9px 8px;
  }

  table.v-table tbody td {
    font-size: 12px;
  }

  .v-chip {
    font-size: 11px;
  }

  .v-datatable.v-table.theme--light button {
    color: rgba(0, 0, 0, 0.54) !important;
  }
</style>

