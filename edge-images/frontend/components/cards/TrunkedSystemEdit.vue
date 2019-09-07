<template>
  <v-layout class="fill-height">
    <v-flex v-if="systemId === null" class="grey--text text--lighten-1" fill-height text-xs-center>
      <div class="display-2 py-4 my-3">Select or create a system.</div>
    </v-flex>
    <v-card v-else>
      <v-card-title>{{trunkedSystem.name}}</v-card-title>
      <v-card-text>{{trunkedSystem}}</v-card-text>
    </v-card>
  </v-layout>
</template>
<script lang="ts">
  import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
  import { TRUNKED_SYSTEM } from "~/assets/apollo/queries/getTrunkedSystem";

  @Component({
    apollo: {
      trunkedSystem() {
        const t = (this as unknown) as TrunkedSystemEdit;
        return {
          query: TRUNKED_SYSTEM,
          variables() {
            return {
              where: {
                id: t.systemId,
              },
            };
          },
        };
      },
    },
  })
  export default class TrunkedSystemEdit extends Vue {
    @Prop({ required: true, default: null })
    systemId!: string | null;
  }
</script>
