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
        :document="require('~/assets/apollo/subscriptions/updatedTrunkedCalls.gql')"
        :updateQuery="onCallUpdate"
      />
      <div v-if="data || loading" class="result apollo">
        <v-card-text>
          <v-data-table
            :items="data ? data.trunkedCalls : []"
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
                @click="selected = props.item"
              >
                <td class="hidden-lg-and-down pl-4">{{ props.item.talkgroup.alphaTag }}</td>
                <td class="hidden-md-and-down pl-4">
                  <v-chip>{{ props.item.talkgroup.tag }}</v-chip>
                </td>
                <td>{{ props.item.talkgroup.description }}</td>
                <td>{{ timeAgo(props.item.startTime) }}</td>
                <td class="pr-4 hidden-sm-and-down">{{ props.item.duration.toFixed(0) + 's' }}</td>
                <td class="text-xs-center">
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
        </v-card-text>
      </div>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component, Prop, Watch } from "vue-property-decorator";
  import moment from "moment";
  import consola from "consola";
  import { TrunkedCall } from "../../assets/prisma-client";
  import { MoonLoader } from "@saeris/vue-spinners";

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
      onCallUpdate(prev, { subscriptionData }) {
        consola.info("emit transcript-updated");
        const updated = subscriptionData.data.updatedCalls as TrunkedCall;
        this.$emit("transcript-updated", updated);
      },
      onCallAdded(previousResult, { subscriptionData }) {
        // The previous result is immutable
        const newResult = {
          trunkedCalls: [...previousResult.trunkedCalls],
        };
        newResult.trunkedCalls.push(subscriptionData.data.trunkedCalls);
        return newResult;
      },
    },
  })
  export default class TrunkedCallTable extends Vue {
    result: { data: { trunkedCalls: TrunkedCall[] } } = {
      data: { trunkedCalls: [] },
    };
    selected: Partial<TrunkedCall> | TrunkedCall = {
      id: undefined,
    };
    error: any = false;

    @Watch("selected", { deep: true })
    selectedUpdated() {
      this.$emit("selection-changed", this.selected);
    }

    @Prop({ required: true })
    realTimeQueueEmpty: boolean = false;

    protected apolloError(e: any) {
      consola.error(e);
      this.error = e;
    }

    protected voiceResults(result: { data: { trunkedCalls: TrunkedCall[] } }) {
      if (
        (typeof this.selected.id === "undefined" && result.data) ||
        this.realTimeQueueEmpty
      ) {
        this.selected = result.data.trunkedCalls[0];
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

