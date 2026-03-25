<script setup lang="ts" name="Doc">
import type Doc from "@/definitions/types/doc";
import { useDocStore } from "@/store/docStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import CodeHighlighter from "./CodeHighlighter.vue";

const docNameList = ref<string[]>();
const doc = ref<Doc>();

const docStore = useDocStore();
const { getDocNameList, getSpecificDoc } = docStore;
const { affiliateMap } = storeToRefs(docStore);
const route = useRoute();
watch(
  () => route.params.docAffiliate,
  async (newDocAffiliate) => {
    await getDocNameList(newDocAffiliate as string);

    if (typeof newDocAffiliate === "string" && affiliateMap) {
      try {
        // 获取指定技术的文档集合
        const map = affiliateMap.value?.get(newDocAffiliate);
        if (map) {
          docNameList.value = [...map!.keys()];
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  { immediate: true },
);

async function getDoc(docName: string) {
  if (typeof route.params.docAffiliate === "string") {
    await getSpecificDoc(route.params.docAffiliate as string, docName);

    doc.value = affiliateMap.value
      ?.get(route.params.docAffiliate as string)
      ?.get(docName);
  }
}
</script>

<template>
  <div class="doc-container">
    <div class="doc-sidebar">
      <div
        v-for="item in docNameList"
        :key="item"
        class="doc-sidebar-option"
        tabindex="0"
        @click="getDoc(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="doc-content">
      <!-- <CodeHighlighter :htmlString="doc?.docContent || ''" /> -->
      <div v-html="doc?.docContent || ''"></div>
    </div>
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
@media (max-width: 768px) {
  .doc-sidebar,
  .doc-outline {
    display: none;
  }
}
</style>
