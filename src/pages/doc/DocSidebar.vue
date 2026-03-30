<script setup lang="ts" name="DocSidebar">
import { ref, watch } from "vue";
import { useDocStore } from "@/store/doc";

const props = defineProps<{
  skill: string;
}>();

const docStore = useDocStore();
const { skillMap, loadMarkdownComponent } = docStore; //技术→文档列表
const list = ref<string[]>([]);
watch(
  () => props.skill,
  (newSkillName) => {
    list.value = skillMap.get(newSkillName) || [];
  },
  { immediate: true },
);
</script>

<template>
  <div class="container">
    <div class="list">
      <div
        class="list__item"
        v-for="(item, index) in list"
        :key="index"
        @click="loadMarkdownComponent(props.skill, item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: var(--font-size);
  padding-top: var(--font-size);
  color: var(--font-clr-one);
}
</style>
