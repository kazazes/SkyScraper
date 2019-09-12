<template>
    <v-app fluid>
        <core-view id="auth-layout"></core-view>
    </v-app>
</template>
<script lang="ts">
  import "@mdi/font/css/materialdesignicons.css";
  import Vue from "vue";
  import { Component } from "vue-property-decorator";
  import View from "~/components/core/View.vue";

  @Component({
    components: {
      "core-view": View,
    },

  })
  export default class Authenticate extends Vue {

  }
</script>

<style lang="scss">
    @import "~assets/style/index.scss";

    #auth-layout {
        background-image: linear-gradient(to left top, #0c1124, #101830, #141e3c, #121b36);
    }

    .banner-logo {
        width: 100%;
        max-width: 500px;
    }

    .otp-input {
        color: indigo;
        background-color: white;
        height: 48px;
        width: 32px;
        font-size: 1.6rem;
        text-align: center;
        border-radius: 4px;
    }

    .disabled .otp-input {
        pointer-events: none;
    }
</style>
