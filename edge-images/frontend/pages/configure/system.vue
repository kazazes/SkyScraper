<template>
  <v-container xs12 fluid pa-0 class="primary lighten-3">
    <v-layout row wrap>
      <v-flex sm4 mx-4 mt-2>
        <v-select
          dark
          :items="['Trunked Voice']"
          label="Type"
          menu-props="auto"
          value="Trunked Voice"
          prepend-icon="mdi-briefcase"
        ></v-select>
      </v-flex>
      <Wizard/>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import Settings from "~/components/voice/trunked/TrunkedAppSettings.vue";
  import Wizard from "~/components/voice/trunked/wizard/TrunkedAppWizard.vue";

  @Component({
    name: "Trunked",
    components: {
      Settings,
      Wizard,
    },
    data: {
      systemType: "Trunked Voice",
    },
  })
  export default class TrunkedPage extends Vue {}
</script>
