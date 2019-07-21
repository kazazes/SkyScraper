<template>
  <v-content pt-1>
    <div id="core-view">
      <transition mode="out-in">
        <nuxt-child/>
      </transition>
    </div>
  </v-content>
</template>

<script>
  export default {
    metaInfo() {
      return {
        title: "SkyScraper",
      };
    },
  };
</script>

<style>
  #core-view {
    height: 100%;
    overflow: visible;
  }
</style>
