<template>
  <v-container fluid pa-0 dark>
    <v-stepper v-model="step">
      <v-stepper-header class="stepper-header">
        <v-stepper-step step="1" editable :complete="step > 1">Target system</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="2" editable :complete="step > 2">Talkgroups</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="3" editable :complete="step > 3">Radios</v-stepper-step>
        <v-divider/>
        <v-stepper-step step="4" editable :complete="step > 4">Deploy</v-stepper-step>
      </v-stepper-header>
      <v-stepper-items light class="white text--black">
        <v-stepper-content step="1">
          <SystemWizard :configs="trunkedConfigs"/>
        </v-stepper-content>
        <v-stepper-content step="2" class="px-0">
          <ChannelsWizard/>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import {trunkedConfigs} from "./queries";
  import ChannelsWizard from "./TrunkedWizardChannels.vue";
  import SystemWizard from "./TrunkedWizardSystem.vue";

  @Component({
    name: "TrunkedAppWizard",
    components: {
      SystemWizard,
      ChannelsWizard
    },
    data: () => {
      const trunkedConfigs: any = {};
      return {
        trunkedConfigs,
        apollo: { trunkedConfigs: { query: trunkedConfigs } },
      };
    }
  })
  export default class TrunkedAppWizard extends Vue {
    step = 1;
  }
</script>
<style lang="scss" scoped>
  .v-stepper__label {
    color: hsla(0, 0%, 100%, 0.5);
  }

  .v-stepper .v-stepper__step__step,
  .v-stepper .v-stepper__step__step .v-icon {
    color: #fff;
  }

  .v-stepper .v-stepper__label {
    color: #ffffff;
  }
</style>
