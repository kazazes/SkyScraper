<template></template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    fetch({ params, redirect }) {
      redirect(307, "/analysis/jupyter");
    },
  })
  export default class AnalysisIndex extends Vue {
  }
</script>
<style>
</style>
