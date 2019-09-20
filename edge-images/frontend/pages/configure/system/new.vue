<template>
  <v-container flex fill-height>
    <v-flex fill-height>
      <TrunkedSystemView :system="system" :editable="true"></TrunkedSystemView>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import TrunkedSystemView from "~/components/cards/TrunkedSystemView/TrunkedSystemView.vue";
  import { BaseTrunkedSystemCreateInput } from "~/types/gql.types";

  @Component({
    components: {
      TrunkedSystemView,
    },
  })
  export default class CustomSystem extends Vue {
    system: BaseTrunkedSystemCreateInput = {
      name: "",
      shortName: "",
    };
  }
</script>
