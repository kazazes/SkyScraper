<template></template>

<script lang="ts">
  import { Component } from "vue-property-decorator";
  import Vue from "vue";

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
