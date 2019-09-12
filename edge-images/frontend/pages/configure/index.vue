<template></template>

<script lang="ts">
  import Vue from "vue";
  import { Component } from "vue-property-decorator";

  @Component({
    fetch({ params, redirect }) {
      redirect(307, "/configure/system");
    },
  })
  export default class ConfigureIndex extends Vue {}
</script>
<style>
</style>
