<template>
  <v-container fill-height xl12 pa-0 fluid d-flex>
    <v-layout>
      <!--suppress HtmlUnknownTarget -->
      <iframe :src="playgroundEndpoint" style="flex: 1 1 auto; width: 100%; border: none;"></iframe>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({})
  export default class GraphQLPlaygrouund extends Vue {
    protected playgroundEndpoint =
      process.env.NODE_ENV === "production"
        ? "/graphql"
        : "http://127.0.0.1:4000/graphql";
  }
</script>
