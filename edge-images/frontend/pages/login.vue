<template />

<style scoped>
  .login-button {
    border: 0;
  }
</style>

<script lang="ts">
import Component from "nuxt-class-component"
import Vue from "vue"

  @Component({})
export default class Login extends Vue {
  mounted () {
    if (!this.$auth.loggedIn) {
      this.$auth.loginWith("auth0")
    }
  }
}
</script>
