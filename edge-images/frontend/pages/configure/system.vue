<template>
  <v-container fluid pa-0 :class="{'fill-height': $vuetify.breakpoint.mdAndUp}">
    <v-layout :class="{'column': $vuetify.breakpoint.smAndDown}">
      <v-flex md4 lg3 v-if="!creatingNewSystem">
        <SystemSelector v-on:system-changed="systemChanged"></SystemSelector>
      </v-flex>
      <v-flex fill-height>
        <nuxt-child :systemId="selectedSystem" v-on:system-changed="systemChanged"></nuxt-child>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import { Component, Watch } from "nuxt-property-decorator";
  import Vue from "vue";
  import { TRUNKED_SYSTEM_STATS } from "~/assets/apollo/queries/trunkedSystemStats";
  import SystemSelector from "~/components/tables/SystemSelector.vue";
  import { TrunkedSystem, TrunkedSystemStats } from "~/types/gql.types";

  @Component({
    head: {
      title: "Systems",
    },
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
          fetchPolicy: "cache-first",
        };
      },
    },
  })
  export default class SystemsConfig extends Vue {
    mounted() {
      this.$nextTick(() => {
        if (
          this.$nuxt.$loading &&
          typeof this.$nuxt.$loading.start === "function"
        )
          this.$nuxt.$loading.start();
      });
    }

    @Watch("$apollo.loading", { deep: true })
    loadingStateChanged() {
      if (this.$apollo.loading) {
        this.$nuxt.$loading.start();
      } else {
        this.$nuxt.$loading.finish();
      }
    }

    trunkedSystemsStats: TrunkedSystemStats[] = [];
    selectedSystem: string | null = null;

    @Watch("trunkedSystemsStats")
    setTrunkedSystemsStats() {
      this.$store.commit("systems/setTrunkedSystems", this.trunkedSystemsStats);
      if (
        this.selectedSystem === null &&
        !this.$route.path.includes("/new") &&
        this.trunkedSystemsStats &&
        this.trunkedSystemsStats[0]
      ) {
        this.selectedSystem = this.trunkedSystemsStats[0].systemId;
        this.$router.push("/configure/system/" + this.selectedSystem);
      }
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

    get creatingNewSystem() {
      return this.$route.path.indexOf("/new") >= 0;
    }
  }
</script>
