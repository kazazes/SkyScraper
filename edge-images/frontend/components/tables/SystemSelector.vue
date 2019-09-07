<template>
  <v-layout row>
    <v-flex sm12 mt-2 mx-4 class="hidden-md-and-up">
      <v-layout row wrap>
        <v-flex sm8 xs12>
          <v-overflow-btn
            dense
            :items="trunkedSystems"
            item-value="systemId"
            item-name="system.shortName"
            :item-text="formatSystemName"
            label="Existing system"
            @change="setSelectedSystem"
            v-model="$route.params.edit"
            nuxt
          ></v-overflow-btn>
        </v-flex>
        <v-flex sm4 text-xs-center>
          <v-btn color="blue-grey darken-2 text-truncate" nuxt to="new">New System</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 style="max-height: 90vh; overflow: scroll;" class="hidden-sm-and-down">
      <v-flex px-4>
        <v-btn class="text--primary" small block outline nuxt to="new">New System</v-btn>
      </v-flex>
      <v-divider></v-divider>
      <v-list dense>
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
          <v-divider :key="'div'+index"></v-divider>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
  import { Vue, Component } from "nuxt-property-decorator";
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
      return this.$store.getters["systems/systems"];
    }

    formatSystemName(item: { system: TrunkedSystem }) {
      return `${item.system.shortName} - ${item.system.name}`;
    }
  }
</script>

<style lang="scss">
  @import "@/assets/style/index.scss";

  .v-list__tile--active {
    background-color: $brand-primary;
    color: #fff !important;
    .v-list__tile__action-text {
      color: #fff !important;
    }
  }
</style>>
