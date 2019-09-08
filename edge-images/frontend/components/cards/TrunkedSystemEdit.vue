<template>
  <v-layout class="fill-height">
    <v-flex v-if="systemId === null" class="grey--text text--lighten-1" fill-height text-xs-center>
      <div class="display-2 py-4 my-3">Select or create a system.</div>
    </v-flex>
    <v-card v-else-if="trunkedSystem" width="100%">
      <v-card-title>{{trunkedSystem.name}}</v-card-title>
      <v-card-text>
        <client-only>
          <code
            class="elevation-1"
            style="width: 100%; max-height: 500px; overflow-y: scroll;"
          >{{trunkedSystem}}</code>
        </client-only>
      </v-card-text>
    </v-card>
  </v-layout>
</template>
<script lang="ts">
  import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
  import { TRUNKED_SYSTEM } from "~/assets/apollo/queries/getTrunkedSystem";
  import { TrunkedSystem } from "~/types/gql.types";

  @Component({
    head() {
      const t = (this as unknown) as TrunkedSystemEdit;
      const s = t.trunkedSystem;
      return {
        title: s ? s.shortName.toUpperCase() + " System" : "Loading...",
      };
    },
    apollo: {
      trunkedSystem() {
        const t = (this as unknown) as TrunkedSystemEdit;
        return {
          prefetch: false,
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
    trunkedSystem?: TrunkedSystem;

    mounted() {
      this.$nextTick(() => {
        const l = this.$nuxt.$loading;
        if (!l) return;

        this.$nuxt.$loading.start();
      });
    }

    @Watch("$apollo.loading", { immediate: true })
    loadingStateChanged() {
      this.$nextTick(() => {
        const l = this.$nuxt.$loading;
        if (!l) return;
        if (this.$apollo.loading) {
          this.$nuxt.$loading.start();
        } else {
          this.$nuxt.$loading.finish();
        }
      });
    }

    @Prop({ required: true, default: null })
    systemId!: string | null;
  }
</script>
