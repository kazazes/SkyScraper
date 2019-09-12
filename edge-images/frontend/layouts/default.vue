<template>
  <v-app fluid>
    <core-toolbar></core-toolbar>
    <core-view></core-view>
  </v-app>
</template>
<script lang="ts">
  import "@mdi/font/css/materialdesignicons.css";
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import CoreToolbar from "~/components/core/Toolbar.vue";
  import View from "~/components/core/View.vue";

  @Component({
    components: {
      "core-toolbar": CoreToolbar,
      "core-view": View,
    },
  })
  export default class Default extends Vue {}
</script>

<style lang="scss">
  @import "../assets/style/index.scss";
</style>
