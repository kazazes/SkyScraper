<template>
  <v-layout row align-start justify-start wrap>
    <v-flex md8 px-3 mt-2>
      <v-card>
        <v-card-title primary-title class="red darken-1 white--text py-1 align-baseline">
          <h4
            class="subtitle mt-2"
          >{{ selected && selected.talkgroup ? selected.talkgroup.description : "Loading..."}}</h4>
        </v-card-title>
        <v-card-text v-if="selected.talkgroup">
          {{selected.talkgroup.alphaTag}} @
          {{formatDate(selected.startTime)}} on
          <span
            class="monospaced"
          >{{ formatFrequency(selected.frequency) }}</span>
          <v-flex v-if="selected.transcription && selected.transcription.body">
            <h5 class="caption">Transcript: (beta)</h5>
            <blockquote
              class="blockquote py-0"
              ref="transcript"
              v-html="stylizeTranscription(selected.transcription.body)"
            ></blockquote>
          </v-flex>
        </v-card-text>
        <v-card-text v-else></v-card-text>
        <v-card-actions class="mx-0 px-0 pb-0">
          <Player
            v-if="selected"
            :toggleAutoPlay="toggleAutoPlay"
            :file="'https://edge.sibyl.vision' + selected.audioPath"
            v-on:play-live-audio="$emit('play-live-audio')"
            v-on:play-next-audio="$emit('play-next-audio')"
            v-on:player-state-pause="$emit('player-state-pause')"
            v-on:player-state-ended="$emit('player-state-ended')"
          ></Player>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex md4 mt-2 pr-3 hidden-sm-and-down>
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
</template>

<script lang="ts">
  import { scale } from "chroma-js";
  import consola from "consola";
  import Mapbox from "mapbox-gl-vue";
  import moment from "moment";
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import { TranscriptionWord, TrunkedCall } from "~/assets/gql.types";
  import Player from "~/components/audio/Player.vue";
  import { toggleAutoPlay } from "../../pages/data/voice.vue";

  const redScale = scale(["red", "black"]).domain([.5, 1]).mode("lab");

  if (process.client) {
    (window as any).mapboxgl = require("mapbox-gl");

  }

  @Component({
    components: {
      Mapbox,
      Player,
    },
    methods: {
      formatDate(d: string) {
        return moment(d).format("lll");
      },
      formatFrequency(hertz: number) {
        return Number(hertz / 1000000).toFixed(3) + " MHz";
      },
    },
    computed: {},
  })
  export default class TrunkedCallCard extends Vue {
    @Prop()
    toggleAutoPlay: toggleAutoPlay = 0;

    get selected(): TrunkedCall {
      return this.$store.getters["trunked/selected"];
    }

    stylizeTranscription(transcript) {
      if (!this.selected.transcription) return;
      if (this.selected.transcription.words && this.selected.transcription.words.length == 0) return ;
      const words = [...this.selected.transcription.words as TranscriptionWord[]];
      const split = this.selected.transcription.body.replace(/[^\w\s]/, "").split(" ");
      const newWords: string[] = [];

      split.forEach((word) => {
        const wIdx = words.findIndex((z) => z.text.replace(/[^\w\s]/, "") === word.replace(/[^\w\s]/, ""));
        if (wIdx == -1) {
          consola.warn(`Couldn't find ${ word } in "${ transcript }"`);
          return;
        }
        const w = words[wIdx];
        words.splice(wIdx, 1);

        const color = redScale(w.confidence).hex();
        newWords.push(w.text.replace(word, `<span style="color: ${ color }">${ word }</span>`));
      });
      return newWords.join(" ");
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
        const i = setTimeout(function () {
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
  }
</script>

<style scoped>
  @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css");

  #map {
    width: 100%;
    height: 100%;
  }
</style>
