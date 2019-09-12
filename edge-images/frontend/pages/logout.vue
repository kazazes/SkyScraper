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
      this.$apolloHelpers.onLogout();
      this.$store.commit("user/setToken", undefined);
      this.$store.commit("user/setUser", undefined);
      this.$router.replace('/')
    }
  }
</script>
