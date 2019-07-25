<template>
  <v-toolbar app dark id="core-toolbar" flat color="primary">
    <v-layout align-center justify-space-around wrap row>
      <v-flex md3 hidden-sm-and-down>
        <!-- <v-toolbar-side-icon @click.stop="onClickBtn"></v-toolbar-side-icon> -->
        <span>
          <v-icon small class="mr-1" color="success">mdi-power-off</v-icon>
          <span class="white--text body-1">System healthy.</span>
        </span>
      </v-flex>
      <v-flex md6 text-xs-center>
        <v-btn round flat active-class="active-nav" nuxt to="/data">Browse</v-btn>
        <v-btn round flat active-class="active-nav" nuxt to="/configure">Configure</v-btn>
        <v-btn round flat active-class="active-nav" nuxt to="/analysis">Analyze</v-btn>
      </v-flex>
      <v-flex md3 class="hidden-md-and-down">
        <v-flex align-center justify-end layout></v-flex>
      </v-flex>
    </v-layout>
  </v-toolbar>
</template>

<script lang="ts">
  import { mapMutations } from "vuex";
  import Component from "nuxt-class-component";
  import Vue from "vue";

  @Component({
    data: () => ({
      notifications: [],
      title: null,
      responsive: false,
      responsiveInput: false,
    }),
    methods: {
      ...mapMutations(["setDrawer", "toggleDrawer"]),
    },
  })
  export default class Toolbar extends Vue {
    mounted() {
      (this as any).onResponsiveInverted();
      window.addEventListener("resize", (this as any).onResponsiveInverted);
    }
    beforeDestroy() {
      window.removeEventListener("resize", (this as any).onResponsiveInverted);
    }

    onClickBtn() {
      (this as any).setDrawer(!this.$store.state.drawer);
    }
    onClick() {
      //
    }
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        (this as any).responsive = true;
        (this as any).responsiveInput = false;
      } else {
        (this as any).responsive = false;
        (this as any).responsiveInput = true;
      }
    }
  }
</script>

<style lang="scss">
  #core-toolbar {
    .v-btn.v-btn--large {
    }

    a {
      text-decoration: none;
      max-width: 30%;
      /* padding: 0 10px; */
    }
  }

  .v-toolbar .v-toolbar__content {
    /* padding: 0 10px !important; */
  }

  .v-toolbar__extension {
    /* padding: 0; */
  }

  .active-nav {
    background-color: #424651 !important;
  }
</style>
