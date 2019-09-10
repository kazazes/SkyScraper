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

