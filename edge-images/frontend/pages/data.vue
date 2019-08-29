<template>
  <v-layout row fill-height pb-5>
    <v-container fluid pa-0 style="min-height: 100%;">
      <v-flex>
        <v-tabs
          :scroll-off-screen="true"
          :scroll-threshold="1"
          centered
          fixed-tabs
          mandatory
          dark
          grow
          color="primary lighten-1"
          z-index="10"
          slider-color="white"
        >
          <v-tab nuxt to="/data/trunked" value="true">
            <v-icon class="pr-2">mdi-microphone</v-icon>
            <span class="text-uppercase">Voice</span>
          </v-tab>
          <v-tab nuxt to="/data/logs">
            <v-icon class="pr-2">mdi-toolbox</v-icon>
            <span class="text-uppercase">Logs</span>
          </v-tab>
        </v-tabs>
      </v-flex>
      <nuxt-child></nuxt-child>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";

  @Component({
    components: {},
  })
  export default class Index extends Vue {}
</script>


<style lang="scss">
  #core-toolbar {
    .v-toolbar__items .v-btn--flat {
      width: 160px;
    }
  }
</style>
