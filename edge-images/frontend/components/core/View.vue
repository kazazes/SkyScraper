<template>
  <v-content>
    <div id="core-view" class="fill-height">
      <transition mode="out-in">
        <nuxt-child />
      </transition>
    </div>
  </v-content>
</template>

<script>
  export default {

  };
</script>

<style>
  #core-view {
    max-height: calc(100vh - 48px);
    overflow: scroll;
  }
</style>
