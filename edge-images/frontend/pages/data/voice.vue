<template>
  <v-container fill-height xl12 d-flex id="voice" pa-0 grid-list-xs>
    <v-layout row align-start justify-start wrap>
      <v-flex xs12>
        <v-alert :value="error" type="error">
          There was an error fetching that data.
          <v-card class="my-2">
            <v-card-text>{{ error }}</v-card-text>
          </v-card>
        </v-alert>
      </v-flex>
      <v-flex md8 order-sm2 order-xs2 order-md1 sm12>
        <ApolloQuery
          :query="require('~/assets/apollo/queries/getTrunkedCalls.gql')"
          :variables="{first: pagination.rowsPerPage, skip: 0}"
          v-on:result="voiceResults"
          v-on:error="apolloError"
        >
          <template slot-scope="{ result: { loading, error, data } }">
            <ApolloSubscribeToMore
              :document="require('~/assets/apollo/subscriptions/subTrunkedCalls.gql')"
              :updateQuery="onMessageAdded"
            />
            <div v-if="data || loading" class="result apollo">
              <v-card-text>
                <v-data-table
                  :items="data.trunkedCalls || []"
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
                      <td class="hidden-md-and-down pl-4">{{ props.item.talkgroup.alphaTag }}</td>
                      <td>
                        <v-chip>{{ props.item.talkgroup.tag }}</v-chip>
                      </td>
                      <td>{{ props.item.talkgroup.description }}</td>
                      <td>{{ timeAgo(props.item.startTime) }}</td>
                      <td
                        class="text-xs-right pr-4 hidden-md-and-down"
                      >{{ props.item.duration.toFixed(0) + 's' }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
            </div>
          </template>
        </ApolloQuery>
      </v-flex>
      <v-flex md4 order-sm1 order-xs1 v-if="selected.audioPath">
        <v-card class="ma-3 mb-4">
          <v-card-title primary-title class="red darken-1 white--text py-1 align-baseline">
            <h3 class="headline mt-2 pl-2">{{selected.talkgroup.alphaTag}}</h3>
            <h4 class="subtitle mt-2 pl-2">{{ selected.talkgroup.description}}</h4>
          </v-card-title>
          <v-card-text>
            {{formatDate(selected.startTime)}}
            <h5 class="caption">Frequency:</h5>
            <span class="monospaced">{{ formatFrequency(selected.frequency) }}</span>
            <v-flex>
              <h5 class="caption">Transcription:</h5>
              <code class="code">Transcription processing</code>
            </v-flex>
          </v-card-text>
          <v-card-actions class="mx-0 px-0 pb-0">
            <Player :autoPlay="autoplay" :file="'https://edge.sibyl.vision' + selected.audioPath"></Player>
          </v-card-actions>
        </v-card>
        <v-card class="elevation-2 ma-3 hidden-md-and-down" style="height: 300px;">
          <Mapbox
            @map-load="mapLoaded"
            accessToken="pk.eyJ1Ijoia2F6YXplcyIsImEiOiJjanR3cG9kOXEyYWtiNDVsbDc3NTZxY3BuIn0.2XRXcuF1xMAsUkuhy9RGKw"
            :map-options="{
                style: 'mapbox://styles/mapbox/dark-v9',
                interactive: false,
                center: {lon: -122.448173, lat: 37.743780},
                zoom: 9,
                attributionControl: false
              }"
            :nav-control="{show: false}"
          ></Mapbox>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator"
  import Player from "~/components/audio/Player.vue";
  import Mapbox from "mapbox-gl-vue";
  import moment from "moment";
  import { VueGoodTable } from "vue-good-table";
  import consola from "consola";

  if (process.client) {
    (window as any).mapboxgl = require("mapbox-gl");
  }

  @Component({
    name: "DataStream",
    components: {
      Player,
      VueGoodTable,
      Mapbox,
    },
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
            formatFn: (val) => Number(val).toFixed(2) + "s",
          },
        ],
        headers: [
          {
            text: "Alpha Tag",
            value: "talkgroup.alphaTag",
            sortable: true,
            class: "hidden-md-and-down pl-4",
          },
          {
            text: "",
            value: "talkgroup.tag",
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
            class: "hidden-md-and-down text-xs-right",
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
        return Number(hertz / 1000000).toFixed(4) + " MHz";
      },
    },
    head: {
      title: "Data Browser | SkyScraper",
    },
  })
  export default class DataStream extends Vue {
    protected selected = { id: undefined };
    protected error: any = false;

    protected apolloError(e: any) {
      consola.error(e);
      this.error = e;
    }

    protected mapLoaded(map: any) {
      const framesPerSecond = 15;
      const initialOpacity = 1;
      let opacity = initialOpacity;
      const initialRadius = 8;
      let radius = initialRadius;
      const maxRadius = 18;

      // Add a source and layer displaying a point which will be animated in a circle.
      map.addSource("point", {
        type: "geojson",
        data: {
          type: "Point",
          coordinates: [-122.4239597, 37.7776025],
        },
      });

      map.addLayer({
        id: "point",
        source: "point",
        type: "circle",
        paint: {
          "circle-radius": initialRadius,
          "circle-radius-transition": { duration: 0 },
          "circle-opacity-transition": { duration: 0 },
          "circle-color": "#e53935",
        },
      });

      map.addLayer({
        id: "point1",
        source: "point",
        type: "circle",
        paint: {
          "circle-radius": initialRadius,
          "circle-color": "#e53935",
        },
      });

      function animateMarker(timestamp) {
        const i = setTimeout(function() {
          requestAnimationFrame(animateMarker);

          radius += (maxRadius - radius) / framesPerSecond;
          opacity -= 0.9 / framesPerSecond;

          try {
            map.setPaintProperty("point", "circle-radius", radius);
            map.setPaintProperty("point", "circle-opacity", opacity);

            if (opacity <= 0) {
              radius = initialRadius;
              opacity = initialOpacity;
            }
          } catch (e) {
            clearTimeout(i);
          }
        }, 1000 / framesPerSecond);
      }

      // Start the animation.
      animateMarker(0);
    }

    get autoplay() {
      return false;
    }

    protected onMessageAdded(previousResult, { subscriptionData }) {
      const newResult = {
        trunkedCalls: [
          subscriptionData.data.trunkedCalls,
          ...previousResult.trunkedCalls,
        ],
      };
      return newResult;
    }

    protected voiceResults(result) {
      if (typeof this.selected.id === "undefined" && result.data) {
        this.selected = result.data.trunkedCalls[0];
      }
    }
  }
</script>

<style scoped>
  @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css");

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

  #map {
    width: 100%;
    height: 100%;
  }
</style>

