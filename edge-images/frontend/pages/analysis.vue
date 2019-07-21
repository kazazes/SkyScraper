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
          <v-tab nuxt to="/analysis/performance">
            <v-icon class="pr-2">mdi-tune</v-icon>
            <span class="text-uppercase">Performance</span>
          </v-tab>
          <v-tab nuxt to="/analysis/graphql">
            <v-icon class="pr-2">mdi-graphql</v-icon>
            <span class="text-uppercase">Graph</span>
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
  export default class Analysis extends Vue {}
</script>


<style lang="scss">
</style>
