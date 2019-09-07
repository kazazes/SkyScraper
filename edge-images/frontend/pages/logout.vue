<template></template>

<style scoped>
  .login-button {
    border: 0;
  }
</style>

<script lang="ts">
  import Component from "nuxt-class-component";
  import Vue from "vue";

  @Component({})
  export default class Logout extends Vue {
    mounted() {
      this.$auth.logout();
      const redirectUrl = `https://${process.env.AUTH0_TENANT}/v2/logout?returnTo=${window.location.origin}`;
      window.location.replace(redirectUrl);
    }
  }
</script>
