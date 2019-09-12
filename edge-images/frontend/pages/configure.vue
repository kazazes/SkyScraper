x<template>
  <v-layout column fill-height>
    <v-container fluid pa-0>
      <v-flex>
        <v-tabs
          centered
          fixed-tabs
          dark
          mandatory
          color="primary darken-1"
          z-index="10"
          slider-color="white"
        >
          <v-tab nuxt to="/configure/system" value="true">
            <v-icon class="pr-2">mdi-plus-box</v-icon>
            <span class="text-uppercase">Systems</span>
          </v-tab>
          <v-tab nuxt to="/configure/pipelines">
            <v-icon class="pr-2">mdi-pipe</v-icon>
            <span class="text-uppercase">Pipelines</span>
          </v-tab>
          <v-tab nuxt to="/configure/admin">
            <v-icon class="pr-2">mdi-account</v-icon>
            <span class="text-uppercase">Users</span>
          </v-tab>
        </v-tabs>
      </v-flex>
      <n-child></n-child>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
  import Component from "nuxt-class-component";
  import Vue from "vue";

  @Component({
    components: {},
    data() {
      return {};
    },
  })
  export default class Configure extends Vue {}
</script>


<style lang="scss">
  .v-tabs {
    .v-tabs__item {
      .v-icon {
        font-size: 22px;
      }
    }
  }
</style>
