<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-layout class="fill-height" tag="v-list" column>
      <v-list-tile avatar>
        <v-list-tile-title class="title text-xs-center">SkyScraper</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
      <v-list-tile v-if="responsive">
        <v-text-field class="purple-input search-input" label="Search..." color="purple"/>
      </v-list-tile>
      <v-list-tile
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        :active-class="color"
        avatar
        class="v-list-item"
      >
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-title v-text="link.text"/>
      </v-list-tile>
      <v-subheader>Applications</v-subheader>
      <v-list-group v-for="(category, i) in applications" :key="'cat' + i" value="true">
        <v-list-tile avatar slot="activator" class="v-list-item">
          <v-list-tile-action>
            <v-icon>{{category.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="category.text"></v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          avatar
          :active-class="color"
          v-for="(app, j) in category.children"
          :key="'app' + j"
          :to="app.to"
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ app.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="app.text"></v-list-tile-title>
        </v-list-tile>
      </v-list-group>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  import { mapMutations, mapState } from "vuex";

  export default {
    data: () => ({
      logo: "./img/vuetifylogo.png",
      links: [
        {
          to: "/dashboard",
          icon: "mdi-view-dashboard",
          text: "Dashboard"
        }
      ],
      applications: [
        {
          icon: "mdi-microphone",
          text: "Voice",
          children: [
            {
              to: "/app/trunked",
              icon: "mdi-briefcase",
              text: "Trunked"
            }
          ]
        }
      ],
      responsive: false
    }),
    computed: {
      ...mapState(["image", "color"]),
      inputValue: {
        get() {
          return this.$store.state.drawer;
        },
        set(val) {
          this.setDrawer(val);
        }
      },
      items() {
        return this.$t("Layout.View.items");
      }
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
      }
    }
  };
</script>

<style lang="scss">
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
