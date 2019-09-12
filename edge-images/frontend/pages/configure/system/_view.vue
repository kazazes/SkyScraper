<template>
  <v-container flex fill-height>
    <v-layout fill-height>
      <v-flex fill-height>
        <TrunkedSystemEdit :systemId="$route.params.view"></TrunkedSystemEdit>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  import TrunkedSystemEdit from "~/components/cards/TrunkedSystemEdit.vue";

  @Component({
    components: { TrunkedSystemEdit },
    key() {
      const t = this as any;
      return "SystemEditPage-" + t.$route.params["view"];
    },
  })
  export default class EditSystem extends Vue {
    mounted() {
      this.$emit("system-changed", this.$route.params["view"]);
    }
  }
</script>
