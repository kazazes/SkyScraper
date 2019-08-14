<template>
  <v-navigation-drawer
    app
    class="primary"
    dark
    id="app-drawer"
    mobile-break-point="1024"
    persistent
    v-model="inputValue"
    width="260"
  >
    <v-layout class="fill-height" column tag="v-list">
      <v-list-tile avatar to="/">
        <v-list-tile-title class="text-xs-center white--text">
          <h5 class="my-1">
            <span class="font-weight-medium">Sky</span>Scraper
          </h5>
        </v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile
        :disabled="link.disabled"
        :key="link.to + i"
        :to="link.to"
        avatar
        class="v-list-item pa-0"
        v-for="(link, i) in links"
      >
        <v-list-tile-action class="px-2">
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title v-text="link.text"/>
      </v-list-tile>
      <div :key="root.title + i" v-for="(root, i) in appLinks">
        <v-subheader>{{ root.title }}</v-subheader>
        <v-list-group
          :disabled="category.disabled"
          :group="category.group"
          :key="root.title + j"
          v-for="(category, j) in root.categories"
          v-model="category.active"
        >
          <v-list-tile avatar class="v-list-item" slot="activator">
            <v-list-tile-action class="px-2">
              <v-icon>{{ category.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="category.text"/>
          </v-list-tile>
          <v-list-tile
            :key="'app' + j"
            :to="app.to"
            avatar
            class="v-list-item"
            v-for="(app, j) in category.children"
          >
            <v-list-tile-action style="margin-left: 20px;">
              <v-icon>{{ app.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="app.text"/>
          </v-list-tile>
        </v-list-group>
      </div>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  import { mapMutations, mapState } from "vuex";

  export default {
    data: () => ({
      mini: false,
      logo: "./img/tower.svg",
      links: [
        {
          to: "/dashboard",
          icon: "mdi-view-dashboard",
          text: "Dashboard",
          disabled: true,
        },
        {
          to: "/",
          icon: "mdi-ballot",
          text: "Data Browser",
          disabled: false,
        },
        {
          to: "/netdata",
          icon: "mdi-chart-bar",
          text: "Resource Monitor",
          disabled: false,
        },
        {
          to: "/profiles",
          icon: "mdi-target-variant",
          text: "Capture Profiles",
          disabled: true,
        },
      ],
      appLinks: [
        {
          title: "Applications",
          categories: [
            {
              disabled: false,
              icon: "mdi-microphone",
              text: "Trunked Radio",
              group: "/trunked",
              children: [
                {
                  to: "/voice/trunked",
                  icon: "mdi-briefcase",
                  text: "Trunked",
                },
              ],
            },
            {
              disabled: true,
              icon: "mdi-blur",
              text: "Digital",
              children: [{}],
            },
            {
              disabled: false,
              icon: "mdi-calculator",
              text: "Analysis",
              children: [
                {
                  to: "/analysis/graphql",
                  icon: "mdi-graphql",
                  text: "GraphQL",
                },
              ],
            },
            {
              disabled: false,
              icon: "mdi-database-search",
              text: "Data Processing",
              children: [
                {
                  to: "/processing/red",
                  icon: "mdi-pipe",
                  text: "Node-RED",
                },
              ],
            },
          ],
        },
        {
          title: "Tools",
          categories: [
            {
              disabled: true,
              icon: "mdi-bug",
              text: "Debug",
              children: [],
            },
            {
              disabled: true,
              icon: "mdi-chip",
              text: "Hardware",
              children: [{}],
            },
          ],
        },
      ],
      debug: [],
      responsive: false,
    }),
    computed: {
      ...mapState(["image", "color"]),
      inputValue: {
        get() {
          return this.$store.state.drawer;
        },
        set(val) {
          this.setDrawer(val);
        },
      },
      items() {
        return this.$t("Layout.View.items");
      },
    },
    mounted() {
      this.onResponsiveInverted();
      window.addEventListener("resize", this.onResponsiveInverted);
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.onResponsiveInverted);
    },
    methods: {
      ...mapMutations(["setDrawer", "toggleDrawer"]),
      onResponsiveInverted() {
        if (window.innerWidth < 991) {
          this.responsive = true;
        } else {
          this.responsive = false;
        }
      },
    },
  };
</script>

<style lang="scss">
  .v-navigation-drawer--mini-variant {
    h5 {
      color: transparent;
    }

    .v-list__group__header__append-icon {
      display: none;
    }
  }

  #app-drawer {
    .v-list__tile {
      border-radius: 0px;
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
