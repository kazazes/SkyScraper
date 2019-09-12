<template>
  <v-card v-bind="$attrs" :style="styles" v-on="$listeners">
    <helper-offset v-if="hasOffset" :inline="inline" :full-width="fullWidth" :offset="offset">
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :class="`elevation-${elevation}`"
        class="v-card--material__header"
        dark
      >
        <slot v-if="!title && !text" name="header" />
        <span v-else>
          <h4 class="title font-weight-light mb-2" v-text="title"></h4>
          <p class="category font-weight-thin" v-text="text"></p>
        </span>
      </v-card>
      <slot v-else name="offset" />
    </helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider v-if="$slots.actions" class="mx-3" />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import { Component, Prop } from "nuxt-property-decorator";
  import Vue from "vue";
  import HelperOffset from "~/components/helper/Offset.vue";

  @Component({
    components: {
      HelperOffset,
    },
  })
  export default class Card extends Vue {
    inheritAttrs = false;
    @Prop({ type: String, default: "secondary" })
    color = "secondary";

    @Prop({ type: [Number, String], default: 10 })
    elevation: Number | String = 10;

    @Prop({ type: Boolean, default: false })
    inline = false;

    @Prop({ type: Boolean, default: false })
    fullWidth = false;

    @Prop({ type: [Number, String], default: 24 })
    offset: number = 24;

    @Prop({ type: String, default: undefined })
    title: String | undefined = undefined;

    @Prop({ type: String, default: undefined })
    text: String | undefined = undefined;

    get hasOffset() {
      return this.$slots.header || this.$slots.offset || this.title || this.text;
    }

    get styles() {
      if (!this.hasOffset) return null;

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset * 2}px`,
      };
    }
  }
</script>

<style lang="scss">
  .v-card--material {
    &__header {
      &.v-card {
        border-radius: 4px;
      }
    }
  }
</style>
