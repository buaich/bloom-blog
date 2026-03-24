<script setup lang="ts" name="Doc">
import { ref } from "vue";

const list = ref<string[]>();
list.value = [
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
  "11dkfajsdkfjaksg",
];
</script>

<template>
  <div class="doc-container">
    <div class="doc-sidebar">
      <div
        v-for="item in list"
        :key="item"
        class="doc-sidebar-option"
        tabindex="0"
      >
        {{ item }}
      </div>
    </div>
    <div class="doc-content"></div>
    <div class="doc-outline"></div>
  </div>
</template>

<style scoped>
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
}

.doc-outline {
  width: var(--doc-outline-width);
  border-left: var(--doc-border);
}

/* @media (max-width: 1024px) {
  .doc-outline {
    display: none;
  }
}
@media (max-width: 768px) {
  .doc-sidebar,
  .doc-outline {
    display: none;
  }
} */
</style>
