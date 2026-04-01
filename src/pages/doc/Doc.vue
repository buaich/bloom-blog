<script setup lang="ts" name="Doc">
import DocOutline from "./DocOutline.vue";
import DocSidebar from "./DocSidebar.vue";
import DocMenu from "./DocMenu.vue";
import MarkdownWrapper from "@/pages/doc/MarkdownWrapper.vue";
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
  <div class="doc">
    <div class="doc-menu">
      <DocMenu></DocMenu>
    </div>
    <div class="doc-main">
      <div class="doc-main__sidebar">
        <DocSidebar :skill="skill"></DocSidebar>
      </div>
      <div class="doc-main__content">
        <MarkdownWrapper>
          <component :is="current" />
        </MarkdownWrapper>
      </div>
      <div class="doc-main__outline">
        <DocOutline></DocOutline>
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc {
  --doc-sidebar-width: 200px;
  --doc-outline-width: 250px;
}
.doc {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--bg-clr);
  color: var(--font-clr-one);
}

.doc-menu {
  display: none;
}

.doc-main {
  display: flex;
  width: 100%;
  height: 100%;
}

.doc-main__sidebar {
  box-sizing: border-box;
  width: var(--doc-sidebar-width);
  border-right: 1px solid var(--border-clr);
  overflow-y: auto;
}

.doc-main__content {
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
}

.doc-main__outline {
  box-sizing: border-box;
  width: var(--doc-outline-width);
  border-left: 1px solid var(--border-clr);
  overflow-y: auto;
}

@media (max-width: 800px) {
  .doc-main__sidebar,
  .doc-main__outline {
    display: none;
  }
}

@media (max-width: 960px) {
  .doc-main__sidebar {
    display: none;
  }
  .doc-menu {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 55px;
  }
}
</style>
