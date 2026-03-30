<script setup lang="ts" name="Doc">
import HelloVue3 from "@/assets/docs/HelloVue3.md";
</script>

<template>
  <div class="doc-container">
    <div class="doc-sidebar"></div>
    <div class="doc-content">
      <HelloVue3></HelloVue3>
    </div>
    <div class="doc-outline"></div>
  </div>
</template>

<style scoped>
@import "github-markdown-css";

.doc-container {
  --doc-sidebar-width: 260px;
  --doc-outline-width: 240px;
  --doc-border: 1px solid #e2e8f0;
  --font-clr: gray;
  --bg-clr: #f8f9fa;
}
.doc-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: var(--bg-clr);
  color: var(--font-clr);
}

.doc-sidebar {
  width: var(--doc-sidebar-width);
  padding: 1em 2em;
  border-right: var(--doc-border);
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 1em;
  cursor: pointer;
}

.doc-sidebar-option:hover {
  color: black;
}
.doc-sidebar-option:focus,
.doc-sidebar-option:active {
  color: black;
}

.doc-content {
  flex: 1;
  overflow-y: auto;
  padding: 2em 4em;
}

.doc-outline {
  width: var(--doc-outline-width);
  border-left: var(--doc-border);
}

@media (max-width: 1024px) {
  .doc-outline {
    display: none;
  }
}
@media (max-width: 750px) {
  .doc-sidebar,
  .doc-outline {
    display: none;
  }
}
</style>
