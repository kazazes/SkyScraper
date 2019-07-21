<template>
  <v-layout column fill-height>
    <v-container fluid pa-0>
      <v-flex>
        <v-tabs
          centered
          fixed-tabs
          dark
          color="primary lighten-1"
          z-index="10"
          slider-color="white"
        >
          <v-tab nuxt to="/data" value="true">
            <v-icon class="pr-2">mdi-microphone</v-icon>
            <span class="text-uppercase">Voice</span>
          </v-tab>
          <v-tab nuxt disabled>
            <v-icon class="pr-2">mdi-toolbox</v-icon>
            <span class="text-uppercase">Raw Stream</span>
          </v-tab>
        </v-tabs>
      </v-flex>
      <n-child></n-child>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";

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
