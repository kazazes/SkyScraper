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
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component({})
export default class JupyterServer extends Vue {
  protected endpoint = process.env.NODE_ENV === 'production' ? "/jupyter" : "https://edge.sibyl.vision/jupyter";
}
</script>
