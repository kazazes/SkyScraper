<template>
  <v-container fluid pa-0 fill-height>
    <v-layout :class="{'row wrap': $vuetify.breakpoint.sm}">
      <v-flex md4 sm12 lg3 class="white">
        <SystemSelector v-on:system-changed="systemChanged"></SystemSelector>
      </v-flex>
      <v-flex fill-height>
        <nuxt-child :systemId="selectedSystem" v-on:system-changed="systemChanged"></nuxt-child>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import { Component, Watch } from "nuxt-property-decorator";
  import { TRUNKED_SYSTEM_STATS } from "~/assets/apollo/queries/trunkedSystemStats";
  import { TrunkedSystemStats, TrunkedSystem } from "~/types/gql.types";
  import { ApolloQueryResult } from "apollo-client";
  import SystemSelector from "~/components/tables/SystemSelector.vue";

  @Component({
    data() {
      return {
        trunkedSystemsStats: [],
      };
    },
    key: "systemConfig",
    components: { SystemSelector },
    middleware: ["auth"],
    apollo: {
      trunkedSystemsStats() {
        const t = this as any;
        return {
          query: TRUNKED_SYSTEM_STATS,
          prefetch: true,
        };
      },
    },
    mounted() {
      const t = (this as unknown) as SystemsConfig;
      t.$nextTick(function() {
        window.addEventListener("resize", t.$forceUpdate);
      });
    },
  })
  export default class SystemsConfig extends Vue {
    trunkedSystemsStats: TrunkedSystemStats[] = [];
    selectedSystem: string | null = null;

    @Watch("trunkedSystemsStats")
    settrunkedSystemsStats() {
      this.$store.commit("systems/setTrunkedSystems", this.trunkedSystemsStats);
    }

    formatSystemName(item: TrunkedSystem) {
      return `${item.shortName} - ${item.name}`;
    }

    systemChanged(systemId: string) {
      if (
        typeof systemId !== "string" ||
        systemId === "undefined" ||
        systemId === null
      )
        return;
      this.selectedSystem = systemId;
    }
  }
</script>
