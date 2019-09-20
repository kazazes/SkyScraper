<template>
  <v-card-title v-if="!editable" v-text="system.name"></v-card-title>
  <v-card-title v-else class="primary">
    <v-text-field label="State"></v-text-field>
    <v-text-field label="System Name"></v-text-field>
  </v-card-title>
</template>
<script lang="ts">
  import { Vue, Component, Prop } from "nuxt-property-decorator";
  import { BaseTrunkedSystemCreateInput } from "~/types/gql.types";

  @Component
  export default class TrunkedSystemTitle extends Vue {
    @Prop({ required: true })
    system!: BaseTrunkedSystemCreateInput;

    @Prop({ required: true, type: Boolean, default: "false" })
    editable;
  }
</script>
