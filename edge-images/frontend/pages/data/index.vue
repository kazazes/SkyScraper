<template></template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    fetch({ params, redirect }) {
      redirect(307, "/data/trunked");
    },
  })
  export default class DataIndex extends Vue {}
</script>
<style>
</style>
