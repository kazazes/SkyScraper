<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex sm6 md4 offset-md2>
        <v-card class="fill-height flexcard" style="position: relative;">
          <v-card-title class="green lighten-1 white--text">Preconfigured System</v-card-title>
          <v-card-text class="grow">
            <p>SkyScraper comes configured with most American trunked radio systems and talkgroups.</p>
            <p>Try a preloaded system before attempting to configure one manually.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              outline
              color="green darken-2"
              nuxt
              ripple
              to="/configure/system/new/preloaded"
            >Use Preconfigured System</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex sm6 md4>
        <v-card class="fill-height flexcard">
          <v-card-title class="primary lighten-1 white--text">Custom System</v-card-title>
          <v-card-text class="grow">
            <p>Required parameters:</p>
            <ul class="body-1 font-weight-light">
              <li>System type (P25, Smartnet, etc.)</li>
              <li>Control channels</li>
              <li>Modulation (QPSK or FSK4)</li>
              <li>Talkgroup metadata</li>
              <li>Bandplan</li>
            </ul>
            <p class="pt-2">
              See documentation
              <a
                target="_blank"
                href="https://github.com/robotastic/trunk-recorder#Configure"
              >here</a>.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              block
              outline
              ripple
              color="primary darken-2"
              nuxt
              to="/configure/system/new/custom"
            >Use Custom System</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({})
  export default class NewSystem extends Vue {}
</script>

<style >
  .flexcard {
    display: flex;
    flex-direction: column;
  }
</style>
