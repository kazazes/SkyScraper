<template>
  <v-container>
    <v-flex>
      <client-only>
        <MaterialCard class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block elevation-6" size="100">
              <v-icon>mdi-user</v-icon>
          </v-avatar>
          <v-card-text class="text-center">
              <code v-text="$store.getters['user/user']"></code>
          </v-card-text>
        </MaterialCard>
      </client-only>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
  import Component from "nuxt-class-component";
  import Vue from "vue";
  import MaterialCard from "~/components/material/Card.vue";

  @Component({
    middleware: ["isAdmin"],
    components: {
      MaterialCard,
    },
    data() {
      return {};
    },
  })
  export default class Admin extends Vue {}
</script>
