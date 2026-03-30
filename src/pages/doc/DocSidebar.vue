<script setup lang="ts" name="DocSidebar">
import { ref, watch } from "vue";
import { useDocStore } from "@/store/doc";

const props = defineProps<{
  skill: string;
}>();
const emit = defineEmits<{
  (e: "select", item: string): void;
}>();
const docStore = useDocStore();
const { skillMap, loadMarkdownComponent } = docStore;
const list = ref<string[]>([]);
const handleClick = (item: string) => {
  loadMarkdownComponent(props.skill, item); // 加载文档内容
  emit("select", item); // 通知父组件关闭侧边栏，同时传递选中的项
};

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
        @click="handleClick(item)"
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

.list {
  cursor: pointer;
}
</style>
