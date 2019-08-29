<template>
  <v-container>
    <v-flex>
      <client-only>
        <MaterialCard class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block elevation-6" size="100">
            <img :src="$auth.user.picture" />
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3" v-text="$auth.user.email"></h6>
            <h4 class="font-weight-light" v-text="$auth.user.name"></h4>
            <v-btn color="red darken-1" block class="my-4" href="/logout">Logout</v-btn>
          </v-card-text>
        </MaterialCard>
      </client-only>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "nuxt-class-component";
  import MaterialCard from "~/components/material/Card.vue";

  @Component({
    middleware: ["auth"],
    components: {
      MaterialCard,
    },
    data() {
      return {};
    },
  })
  export default class Admin extends Vue {}
</script>
