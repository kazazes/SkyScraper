<template>
  <v-container flex fill-height>
    <v-flex fill-height>
      <h3>PRELOAD</h3>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import Wizard from "~/components/voice/trunked/wizard/TrunkedAppWizard.vue";

  @Component({
    components: {
      Wizard,
    },
  })
  export default class PreloadedSystem extends Vue {}
</script>
