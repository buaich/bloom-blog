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
<style scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-clr);
}

.main {
  padding: 55px 0 0 0;
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 960px) {
  .main {
    padding: 0;
  }
}
</style>
