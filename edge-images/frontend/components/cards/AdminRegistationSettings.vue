<template>
    <v-stepper-content step="3">
        <v-card color="transparent" flat class="mb-5">
            <v-card-text>
                <span class="title">Remote access level</span>
                <v-radio-group v-model="remoteAccessSetting">
                    <v-radio
                        color="primary"
                        v-for="(n, idx) in remoteAccessLabels"
                        :key="idx"
                        :label="n"
                        :value="remoteAccessVakues[idx]"
                    ></v-radio>
                </v-radio-group>
            </v-card-text>
        </v-card>
        <v-btn color="primary" @click="step = 4">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
    </v-stepper-content>
</template>
<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";

  @Component({
    name: "admin-registation-settings",
    props: {
      step: {},
    },
    data() {
      return {
        remoteAccessSetting: "remote-private",
        remoteAccessLabels: [`Local network only <span class='small'>Ony LAN</span>`, "Remote admin access", "Public audio browser"],
        remoteAccessVakues: ["local-only", "remote-private", "remote-public"],
      };
    },
  })
  export default class AdminRegistationSettings extends Vue {
    remoteAccessLabels = ["Local network only", "Remote admin access", "Public data browser"];
    remoteAccessVakues = ["local-only", "remote-private", "remote-public"];
    remoteAccessSetting = "remote-private";
  };
</script>
