<script setup lang="ts">
import HomeMenu from "./components/HomeMenu.vue";
</script>

<template>
  <div class="app">
    <HomeMenu />
    <div class="router-view-wrapper">
      <router-view name="default" />
    </div>
  </div>
</template>
<style scoped></style>
