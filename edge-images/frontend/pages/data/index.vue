<template />

<script lang="ts">
import { Component } from "vue-property-decorator"
import Vue from "vue"

  @Component({
    fetch ({ params, redirect }) {
      redirect(307, "/data/trunked")
    }
  })
export default class DataIndex extends Vue {}
</script>
<style>
</style>
