<template>
  <v-layout wrap align-start justify-start>
    <v-flex px-3 mt-2 md6>
      <v-card class="card">
        <v-card-title primary-title class="red darken-1 white--text py-1 align-baseline">
          <h4
            class="subtitle mt-2"
          >{{ selected && selected.talkgroup ? selected.talkgroup.description : "Loading..."}}</h4>
        </v-card-title>
        <v-card-text v-if="selected && selected.talkgroup">
          {{selected.talkgroup.alphaTag}} @
          {{formatDate(selected.startTime)}} on
          <span
            class="monospaced"
          >{{ formatFrequency(selected.frequency) }}</span>
        </v-card-text>
        <v-card-text v-else></v-card-text>
        <v-card-actions class="mx-0 px-0 pb-0">
          <Player
            :toggleAutoPlay="toggleAutoPlay"
            :file="selected ? `https://${edgeHostname}` + selected.audioPath : ''"
            v-on:play-live-audio="$emit('play-live-audio')"
            v-on:play-next-audio="$emit('play-next-audio')"
            v-on:player-state-pause="$emit('player-state-pause')"
            v-on:player-state-ended="$emit('player-state-ended')"
          ></Player>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex px-3 mx-0 mt-2 md6>
      <v-card class="card">
        <v-card-title class="primary py-1 align-baseline white--text">
          <v-flex>
            <h5 class="subtitle mt-2">Transcription (beta)</h5>
          </v-flex>
        </v-card-title>
        <v-card-text class="white">
          <blockquote
            v-if="selectedTranscription !== undefined"
            class="blockquote pa-0 ma-1"
            ref="transcript"
            v-html="stylizeTranscription(selectedTranscription)"
          ></blockquote>
          <span v-else>processing...</span>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script lang="ts">
  import { scale } from "chroma-js";
  import consola from "consola";
  import moment from "moment";
  import Vue from "vue";
  import Component from "vue-class-component";
  import { Prop } from "vue-property-decorator";
  import Player from "~/components/audio/Player.vue";
  import { Transcription, TranscriptionWord, TrunkedCall } from "~/types/gql.types";
  import { toggleAutoPlay } from "~/utils/enums";

  const redScale = scale(["red", "black"])
    .domain([0.5, 1])
    .mode("lab");

  @Component({
    components: {
      Player,
    },
    methods: {},
    computed: {},
  })
  export default class TrunkedCallCard extends Vue {
    @Prop()
    toggleAutoPlay: toggleAutoPlay = 0;

    get edgeHostname() {
      return this.$store.getters["edgeHostname"];
    }

    get selected(): TrunkedCall {
      return this.$store.getters["trunked/selected"];
    }

    get selectedTranscription(): Transcription {
      return this.$store.getters["trunked/selectedTranscription"];
    }

    stylizeTranscription(transcription: Transcription) {
      if (
        !transcription || (
        transcription.words &&
        transcription.words.length == 0)
      )
        return;
      const words = [
        ...(transcription.words as TranscriptionWord[]),
      ];
      const split = transcription.body
        .replace(/[^\w\s]/, "")
        .split(" ");
      const newWords: string[] = [];

      split.forEach((word) => {
        const wIdx = words.findIndex(
          (z) => z.text.replace(/[^\w\s]/, "") === word.replace(/[^\w\s]/, ""),
        );
        if (wIdx == -1) {
          consola.warn(`Couldn't find ${ word } in "${ transcription.body }"`);
          return;
        }
        const w = words[wIdx];
        words.splice(wIdx, 1);

        const color = redScale(w.confidence).hex();
        newWords.push(
          w.text.replace(word, `<span style="color: ${ color }">${ word }</span>`),
        );
      });
      return newWords.join(" ");
    }

    formatDate(d: string) {
      return moment(d).format("lll");
    }

    formatFrequency(hertz: number) {
      return Number(hertz / 1000000).toFixed(3) + " MHz";
    }
  }
</script>

<style lang="css">

</style>
