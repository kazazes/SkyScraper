<template />

<script lang="ts">
import { Component } from "vue-property-decorator"
import Vue from "vue"

  @Component({
    fetch ({ params, redirect }) {
      redirect(307, "/configure/system")
    }
  })
export default class ConfigureIndex extends Vue {}
</script>
<style>
</style>
