<script setup lang="ts">
import BlogNavbar from "./components/BlogNavbar.vue";
</script>

<template>
  <div class="app">
    <BlogNavbar />
    <div class="router-view-wrapper">
      <router-view name="default" />
    </div>
  </div>
</template>
<style scoped></style>
