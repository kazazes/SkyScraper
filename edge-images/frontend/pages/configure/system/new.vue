<template>
  <v-container flex fill-height>
    <v-flex fill-height>
      <v-flex sm6 md5 lg4>
        <v-select
          dark
          :items="['Trunked Voice']"
          label="Type"
          menu-props="auto"
          value="Trunked Voice"
          prepend-icon="mdi-briefcase"
        ></v-select>
      </v-flex>
      <v-flex>
        <Wizard />
      </v-flex>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
  import { Vue, Component } from "nuxt-property-decorator";
  import Wizard from "~/components/voice/trunked/wizard/TrunkedAppWizard.vue";

  @Component({
    components: {
      Wizard,
    },
  })
  export default class NewSystem extends Vue {}
</script>
