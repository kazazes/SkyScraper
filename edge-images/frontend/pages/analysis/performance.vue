<template>
  <iframe :src="netdataEndpoint" name="netdata" style="width: 100%; border: none; height: 100%;" />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"
import Vue from "vue"

  @Component({})
export default class Performance extends Vue {
    protected netdataEndpoint =
      process.env.NODE_ENV === "production" ? "/netdata/" : "//127.0.0.1:19999/";
}
</script>
<style>
  #netdata {
    z-index: 0;
  }
</style>
