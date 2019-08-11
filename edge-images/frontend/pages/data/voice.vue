<template>
  <v-container
    id="voice"
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
          <v-btn color="red lighten-2">
            <v-icon>mdi-access-point</v-icon>&nbsp;Live
          </v-btn>
        </v-btn-toggle>
      </v-flex>
      <v-flex xs12>
        <v-layout row align-start justify-start wrap>
          <v-flex md8 px-3 mt-2>
            <v-card>
              <v-card-title primary-title class="red darken-1 white--text py-1 align-baseline">
                <h4
                  class="subtitle mt-2"
                >{{ selected ? selected.talkgroup.description : "Loading..."}}</h4>
              </v-card-title>
              <v-card-text v-if="selected">
                {{selected.talkgroup.alphaTag}} @
                {{formatDate(selected.startTime)}} on
                <span
                  class="monospaced"
                >{{ formatFrequency(selected.frequency) }}</span>
                <v-flex>
                  <h5 class="caption">Transcription:</h5>
                  <code
                    class="code"
                    ref="transcript"
                  >{{selected.transcription ? selected.transcription.body : ''}}</code>
                </v-flex>
              </v-card-text>
              <v-card-text v-else style="min-height: 200px;"></v-card-text>
              <v-card-actions class="mx-0 px-0 pb-0">
                <Player
                  v-if="selected"
                  :toggleAutoPlay="toggleAutoPlay"
                  :file="'https://edge.sibyl.vision' + selected.audioPath"
                  v-on:play-live-audio="playLiveAudio"
                  v-on:play-next-audio="playRealtimeAudio"
                  v-on:player-state-pause="playerStatePause"
                  v-on:player-state-ended="playerStateEnded"
                  ref="player"
                ></Player>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex md4 mt-2 pr-3>
            <v-card class="elevation-2 hidden-sm-and-down" style="height: 240px;">
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
      </v-flex>
      <v-flex>
        <TrunkedCallTable
          v-on:selection-changed="selectionChanged"
          v-on:transcript-updated="transcriptUpdated"
          :real-time-queue-empty="realTimeQueueEmpty"
        ></TrunkedCallTable>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import Player from "~/components/audio/Player.vue";
  import Mapbox from "mapbox-gl-vue";
  import moment from "moment";
  import consola from "consola";
  import { TrunkedCall } from "../../assets/prisma-client";
  import TrunkedCallTable from "../../components/tables/TrunkedCallTable.vue";

  if (process.client) {
    (window as any).mapboxgl = require("mapbox-gl");
  }

  export enum toggleAutoPlay {
    SINGLE = 0,
    REALTIME = 1,
    LIVE = 2,
  }

  @Component({
    name: "TrunkedVoiceData",
    components: {
      Player,
      Mapbox,
      TrunkedCallTable,
    },
    data() {
      return { selected: undefined };
    },
    methods: {
      formatDate(d: string) {
        return moment(d).format("lll");
      },
      formatFrequency(hertz: number) {
        return Number(hertz / 1000000).toFixed(3) + " MHz";
      },
    },
    head: {
      title: "Data Browser | SkyScraper",
    },
  })
  export default class DataStream extends Vue {
    protected selected: any;
    protected error: any = false;
    protected toggleAutoPlay: toggleAutoPlay = 0;
    protected returnedCalls: any[] = [];
    protected paused = true;
    realTimeQueueEmpty: boolean = false;

    transcriptUpdated(updated: any) {
      consola.debug("caught transcript-updated");
      if (updated.id === this.selected.id) {
        this.selected.transcription = updated.transcription;
      }
    }

    selectionChanged(newSel: any) {
      this.selected = newSel;
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
          const current = this.returnedCalls.findIndex(
            (call: any, idx: number) => {
              if (call.id === this.selected.id) return true;
            }
          );
          const next = current - 1;
          if (current - 1 > 0) {
            this.selected = this.returnedCalls[next];
            this.realTimeQueueEmpty = false;
          } else {
            this.realTimeQueueEmpty = true;
          }
        default:
          break;
      }
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

    protected playLiveAudio() {
      this.selected = this.returnedCalls[0];
    }

    protected playRealtimeAudio() {}
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

