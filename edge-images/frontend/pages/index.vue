<template>
  <v-container fill-height xl12 pa-0 fluid d-flex id="dashboard">
    <v-layout></v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    fetch({ params, redirect }) {
      redirect(307, "/data");
    },
  })
  export default class Home extends Vue {}
</script>
<style>
</style>
