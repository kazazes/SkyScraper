<template>
  <v-container fill-height xl12 pa-0 fluid d-flex>
    <v-layout>
      <!--suppress HtmlUnknownTarget -->
      <iframe
        :src="endpoint"
        style="flex: 1 1 auto; width: 100%; border: none;"
      ></iframe>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    head: {
      title: "Jupyter | SkyScraper",
    },
  })
  export default class JupyterServer extends Vue {
    protected endpoint = process.env.NODE_ENV === "production" ? "/jupyter" : `https://${ process.env.EDGE_HOSTNAME }/jupyter`;
  }
</script>
