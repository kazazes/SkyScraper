<template>
  <v-app fluid>
    <core-toolbar />
    <core-view />
  </v-app>
</template>
<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import CoreToolbar from "~/components/core/Toolbar.vue"
import View from "~/components/core/View.vue"
import "@mdi/font/css/materialdesignicons.css"

  @Component({
    components: {
      "core-toolbar": CoreToolbar,
      "core-view": View
    }
  })
export default class Default extends Vue {}
</script>

<style lang="scss">
  @import "~assets/style/index.scss";

  /* Remove in 1.2 */
  .v-datatable thead th.column.sortable i {
    vertical-align: unset;
  }
</style>
