<script setup lang="ts" name="Doc">
import DocOutline from "./DocOutline.vue";
import DocSidebar from "./DocSidebar.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { useDocStore } from "@/store/doc";
import { storeToRefs } from "pinia";

const route = useRoute();
const skill = ref<string>(route.params.skill as string); //路由参数
const docStore = useDocStore();
const { loadFirst } = docStore; //初次加载Markdown组件
const { current } = storeToRefs(docStore); //当前展示的Markdown组件

watch(
  () => skill.value,
  (skill) => {
    if (skill) {
      loadFirst(skill as string);
    } else {
      current.value = null;
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="doc-container">
    <div class="doc-sidebar">
      <DocSidebar :skill="skill"></DocSidebar>
    </div>
    <div class="doc-content">
      <component :is="current" />
    </div>
    <div class="doc-outline">
      <DocOutline></DocOutline>
    </div>
  </div>
</template>

<style scoped>
.doc-container {
  --doc-sidebar-width: 250px;
  --doc-outline-width: 250px;
}
.doc-container {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: var(--bg-clr);
  color: var(--font-clr-one);
}

.doc-sidebar {
  box-sizing: border-box;
  width: var(--doc-sidebar-width);
  border-right: 1px solid var(--border-clr);
  overflow-y: auto;
}

.doc-content {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.doc-outline {
  box-sizing: border-box;
  width: var(--doc-outline-width);
  border-left: 1px solid var(--border-clr);
  overflow-y: auto;
}

@media (max-width: 1000px) {
  .doc-sidebar {
    display: none;
  }
}

@media (max-width: 800px) {
  .doc-sidebar,
  .doc-outline {
    display: none;
  }
}
</style>
