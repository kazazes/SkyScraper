<template>
  <v-container flex fill-height>
    <v-layout fill-height>
      <v-flex fill-height>
        <TrunkedSystemEdit :systemId="$route.params.edit"></TrunkedSystemEdit>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "nuxt-property-decorator";
  import TrunkedSystemEdit from "~/components/cards/TrunkedSystemEdit.vue";
  import { TrunkedSystem } from "~/types/gql.types";

  @Component({
    components: { TrunkedSystemEdit },
    key() {
      const t = this as any;
      return "SystemEditPage-" + t.$route.params["edit"];
    },
  })
  export default class EditSystem extends Vue {
    mounted() {
      this.$emit("system-changed", this.$route.params["edit"]);
    }
  }
</script>
