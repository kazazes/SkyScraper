<template>
  <v-layout>
    <TrunkedSystemTitle system="system" :editable="editable"></TrunkedSystemTitle>
  </v-layout>
</template>
<script lang="ts">
  import { Vue, Prop, Component } from "nuxt-property-decorator";
  import TrunkedSystemTitle from "./TrunkedSystemTitle.vue";
  import { BaseTrunkedSystemCreateInput } from "~/types/gql.types";

  @Component({
    components: {
      TrunkedSystemTitle,
    },
  })
  export default class TrunkedSystemView extends Vue {
    @Prop({ required: true })
    system!: BaseTrunkedSystemCreateInput;

    @Prop({ required: true, type: Boolean, default: "false" })
    editable;
  }
</script>
