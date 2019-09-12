<template>
  <v-container fill-height xl12 pa-0 fluid d-flex>
    <v-layout>
      <!--suppress HtmlUnknownTarget -->
      <iframe :src="nodeRedEndpoint" style="flex: 1 1 auto; width: 100%; border: none;"></iframe>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    middleware: ["auth"],
  })
  export default class Pipelines extends Vue {
    protected nodeRedEndpoint =
      process.env.NODE_ENV === "production" ? "/red/" : "//127.0.0.1:1880";
  }
</script>
