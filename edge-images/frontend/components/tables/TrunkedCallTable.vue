<template>
  <ApolloQuery
    :query="require('~/assets/apollo/queries/getTrunkedCalls.gql')"
    :variables="{first: pagination.rowsPerPage, skip: 0}"
    v-on:result="voiceResults"
    v-on:error="apolloError"
  >
    <v-flex xs12>
      <v-alert :value="error" type="error">
        There was an error fetching that data.
        <v-card class="my-2">
          <v-card-text>{{ error }}</v-card-text>
        </v-card>
      </v-alert>
    </v-flex>
    <template slot-scope="{ result: { loading, error, data } }">
      <ApolloSubscribeToMore
        :document="require('~/assets/apollo/subscriptions/newTrunkedCalls.gql')"
        :updateQuery="onCallAdded"
      />
      <ApolloSubscribeToMore
        :document="require('~/assets/apollo/subscriptions/transcriptions.gql')"
        :updateQuery="onTranscriptionAdded"
      />
      <div v-if="data || loading" class="result apollo">
        <v-card-text>
          <v-data-table
            :items="trunkedCalls"
            :headers="headers"
            :rows-per-page-items="[25,50,100]"
            :loading="loading"
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
                  >mdi-script-text-outline
                  </v-icon>
                  <span v-else>
                    <moon-loader :size="16" style="margin: auto;"></moon-loader>
                  </span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </div>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
  import { MoonLoader } from "@saeris/vue-spinners";
  import consola from "consola";
  import moment from "moment";
  import { Component, Prop } from "nuxt-property-decorator";
  import Vue from "vue";
  import { Transcription, TrunkedCall } from "../../assets/gql.types";

  @Component({
    name: "TrunkedCallTable",
    components: { "moon-loader": MoonLoader },
    data() {
      return {
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 25,
          sortBy: "startTime",
        },
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
    methods: {
      timeAgo(d: string) {
        return moment(d).fromNow();
      },
      formatDate(d: string) {
        return moment(d).format("lll");
      },
      formatFrequency(hertz: number) {
        return Number(hertz / 1000000).toFixed(3) + " MHz";
      },
    },
  })
  export default class TrunkedCallTable extends Vue {
    result: { data: { trunkedCalls: TrunkedCall[] } } = {
      data: { trunkedCalls: [] },
    };
    error: any = false;

    @Prop({ required: true })
    realTimeQueueEmpty: boolean = false;

    get trunkedCalls() {
      return this.$store.getters["trunked/trunkedCalls"];
    }

    get selected() {
      const stored = this.$store.getters["trunked/selected"];
      return stored;
    }

    protected apolloError(e: any) {
      consola.error(e);
      this.error = e;
    }

    onCallAdded(previousResult, { subscriptionData }) {
      const newCall = subscriptionData.data.trunkedCalls as TrunkedCall;
      // The previous result is immutable
      const newResult = {
        trunkedCalls: previousResult ? [newCall, ...previousResult.trunkedCalls] : [] as TrunkedCall[],
      };

      if (!newCall.id) debugger;
      newResult.trunkedCalls.push(newCall);
      this.$store.commit("trunked/add", newCall);
      return newResult;
    }

    onTranscriptionAdded(previousResult, { subscriptionData }) {
      const newTranscript = subscriptionData.data.transcriptions as Transcription;
      const calls = previousResult ? [...previousResult.trunkedCalls as TrunkedCall[]] : [] as TrunkedCall[];
      const idx = calls.findIndex(
        (c: TrunkedCall) => c.id === newTranscript.call.id,
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

      this.$store.commit("trunked/setTranscription", newTranscript);
      return newResult;
    }

    protected voiceResults(result: { data: { trunkedCalls: TrunkedCall[] } }) {
      if (
        (typeof this.selected.id === "undefined" && result.data) ||
        this.realTimeQueueEmpty
      ) {
        this.$store.commit("trunked/add", result.data.trunkedCalls);
        this.$store.commit("trunked/setSelected", result.data.trunkedCalls[0]);
      }
    }
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

