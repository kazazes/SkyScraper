<template>
  <v-layout
    row
    :style="{'height: calc(100vh - 96px); overflow: scroll;': $vuetify.breakpoint.mdAndUp}"
    v-if="!creatingNewSystem"
  >
    <v-btn fixed bottom left fab round small nuxt to="/configure/system/new">
      <v-icon small color="white">mdi-plus</v-icon>
    </v-btn>
    <v-flex sm12 mt-2 mx-4 class="hidden-md-and-up" v-if="!$route.path.includes('/new')">
      <v-layout row wrap>
        <v-flex sm6 offset-sm3 xs12>
          <v-overflow-btn
            dense
            small
            :items="trunkedSystems"
            item-value="systemId"
            item-name="system.shortName"
            :item-text="formatSystemName"
            :label="'Existing systems (' + trunkedSystems.length + ')'"
            @change="setSelectedSystem"
            v-model="$route.params.edit"
            nuxt
          ></v-overflow-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-container pr-1>
      <v-flex xs12 class="hidden-sm-and-down">
        <v-card>
          <v-list subheader style="padding: 0;">
            <v-card-text class="pa-0">
              <div v-if="creatingNewSystem || trunkedSystems.length === 0">
                <v-list-tile
                  avatar
                  :disabled="trunkedSystems.length > 0"
                  nuxt
                  to="/configure/system/new"
                >
                  <v-list-tile-content class="pt-1">
                    <v-list-tile-title>New System</v-list-tile-title>
                    <v-list-tile-title
                      class="text-uppercase text-truncate caption font-weight-light"
                    >new</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </div>
              <template v-for="(item, index) in trunkedSystems">
                <v-list-tile
                  avatar
                  nuxt
                  :key="item.id"
                  :to="'/configure/system/' + item.systemId"
                  @click.native="setSelectedSystem(item.systemId)"
                >
                  <v-list-tile-content class="pt-1">
                    <v-list-tile-title>{{item.system.name}}</v-list-tile-title>
                    <v-list-tile-title
                      class="text-uppercase text-truncate caption font-weight-light"
                    >{{ item.system.shortName }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-list-tile-action-text class="text-xs-right">
                      {{item.callCount | formatThousandsAsK}} calls
                      <br />
                      {{ item.talkgroupCount | formatThousandsAsK}} TGs
                    </v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="'div'+index" v-if="index < trunkedSystems.length - 1"></v-divider>
              </template>
            </v-card-text>
          </v-list>
        </v-card>
      </v-flex>
    </v-container>
  </v-layout>
</template>
<script lang="ts">
  import { Vue, Component, Watch } from "nuxt-property-decorator";
  import { TrunkedSystem } from "~/types/gql.types";

  @Component({
    filters: {
      formatThousandsAsK(n: number) {
        if (n > 1000) {
          return (n / 1000).toFixed(1) + "k";
        }
        return n.toLocaleString();
      },
    },
  })
  export default class SystemSelector extends Vue {
    setSelectedSystem(selectedSystemId: string) {
      this.$emit("system-changed", selectedSystemId);
      this.$router.push("/configure/system/" + selectedSystemId);
    }

    get trunkedSystems() {
      return this.$store.getters["systems/systems"] || [];
    }

    formatSystemName(item: { system: TrunkedSystem }) {
      return `${item.system.shortName} - ${item.system.name}`;
    }

    get creatingNewSystem() {
      return this.$route.path.indexOf("/new") >= 0;
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/index.scss";

  .v-list__tile__title {
    font-size: 14px;
  }

  .v-list__tile--active,
  .v-btn--floating.v-btn--fixed.v-btn--left.v-btn--round {
    background-color: darken($color: $indigo, $amount: 30) !important;
    color: #fff !important;
    .v-list__tile__action-text {
      color: #fff !important;
    }
  }

  .v-list--disabled {
    .v-list__tile--active {
      background-color: lighten($color: $indigo, $amount: 10) !important;
    }
  }
</style>>
