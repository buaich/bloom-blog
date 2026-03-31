<script setup lang="ts" name="NavSearch">
import { useTemplateRef, onMounted, onUnmounted } from "vue";

const keys = useTemplateRef<HTMLSpanElement>("keys"); //DOM元素
/**
 * @description 搜索聚焦
 * @param {Event} event - 当前事件对象
 * @returns {undefined}
 */
function focusSearchKeys(event: KeyboardEvent) {
  // 阻止默认行为
  if ((event.ctrlKey || event.metaKey) && event.key === "f") {
    event.preventDefault();
    keys.value?.focus();
  }
}
onMounted(() => window.addEventListener("keydown", focusSearchKeys));
onUnmounted(() => window.removeEventListener("keydown", focusSearchKeys));
</script>

<template>
  <div class="search">
    <button class="search-button" type="button">
      <span class="search-button-title"
        ><svg
          t="1774508615134"
          class="search-button-logo"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2594"
          width="20"
          height="20"
        >
          <path
            d="M961.595655 897.17409l-181.388844-177.951232a428.604285 428.604285 0 0 0-22.454184-592.000526 450.546484 450.546484 0 0 0-627.546887 0 428.604285 428.604285 0 0 0 0 615.405538 451.497312 451.497312 0 0 0 581.760832 37.52116l183.290502 179.926031a48.784822 48.784822 0 0 0 31.231063 15.140117c12.287631 0 24.136419-4.754143 33.13272-13.165319a45.859196 45.859196 0 0 0 1.974798-64.875769zM93.635408 434.925101A347.198727 347.198727 0 0 1 444.271746 93.650768a347.198727 347.198727 0 0 1 350.051213 341.347473 347.198727 347.198727 0 0 1-350.051213 341.347474A347.198727 347.198727 0 0 1 93.635408 434.925101z"
            p-id="2595"
          ></path>
        </svg>
        <span class="dosearch-button-text">search</span></span
      >
      <span tabindex="0" class="search-button-keys" ref="keys">
        <kbd class="search-button-key">Ctrl</kbd>
        <kbd class="search-button-key">F</kbd>
      </span>
    </button>
  </div>
</template>

<style scoped>
.search {
  display: flex;
  width: 100%;
  height: 100%;
}
.search-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0 calc(var(--font-size) / 2);
  cursor: pointer;
  color: var(--font-clr-two);
}
.search-button-title {
  display: flex;
  align-items: center;
  padding: 0 calc(var(--font-size) / 2) 0 0;
}
.search-button-logo {
  fill: var(--font-clr-two);
  margin-right: calc(var(--font-size) / 2);
  transition: fill var(--transtion-standard);
}
.search-button-keys {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(var(--font-size) / 2);
  border: 1px solid var(--font-clr-two);
  border-radius: 4px;
  color: var(--font-clr-two);

  transition: all var(--transtion-standard);
}
.search-button-key {
  height: calc(var(--font-size) * 1.5);
  line-height: calc(var(--font-size) * 1.5);
  padding: 0 calc(var(--font-size) / 4) 0 0;
}
.docsearch:hover .search-button-logo {
  fill: var(--font-clr-two);
}
.docsearch:hover .search-button-keys {
  border-color: var(--font-clr-one);
  color: var(--font-clr-one);
}
.search-button-keys:focus,
.search-button-keys:focus-visible {
  color: var(--font-clr-one);
  border: 1px solid var(--font-clr-one);
}

@media (max-width: 800px) {
  .dosearch-button-text,
  .search-button-keys {
    display: none;
  }

  .search {
    justify-content: flex-end;
  }
}
</style>
