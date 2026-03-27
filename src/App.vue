<script setup lang="ts">
import BlogNavbar from "./components/BlogNavbar.vue";
</script>

<template>
  <div class="app">
    <BlogNavbar />
    <main class="main">
      <router-view name="default" />
    </main>
  </div>
</template>
<style scoped></style>
