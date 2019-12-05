<template>
  <v-container
    id="dashboard"
    fill-height
    xl12
    pa-0
    fluid
    d-flex
  >
    <v-layout />
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"
import Vue from "vue"

  @Component({
    fetch ({ params, redirect }) {
      redirect(307, "/data")
    }
  })
export default class Home extends Vue {}
</script>
<style>
</style>
