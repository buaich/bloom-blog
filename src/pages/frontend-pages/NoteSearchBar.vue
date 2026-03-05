<script setup lang="ts" name="NoteSearchBar">
import { useNoteStore } from "@/store/noteStore";
import emitter from "@/utils/emitter";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const store = useNoteStore();
const route = useRoute();
const { noteList: list } = storeToRefs(store);

/*
 * description:不能直接在setup语法糖中使用顶层await！
 */
onMounted(async () => {
  await store.search(route.params.name as string);
});

/*
 * description: 仅路由参数变化，组件复用，使用下面的导航守卫钩子
 * @params:(to)目标路由
 */
onBeforeRouteUpdate(async (to) => {
  store.clean();
  await store.search(to.params.name as string);
});

/*
 * description: 用于点击事件的回调函数，发送笔记数据给NoteShowBox.vue
 * @params:(),()
 */
function send(index: number) {
  console.log("<NoteSearchBar.vue>:send note to NoteShowBox.vue", index);
  emitter.emit("note", list.value[index]?.noteContent);
}
</script>

<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
      <div
        class="search-bar-option"
        tabindex="0"
        v-for="(note, index) in list"
        :key="index"
        @click="send(index as number)"
      >
        <p class="bar-option-detail">{{ note?.noteTitle }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  width: 15%;
  height: 100%;
  background-color: gary;
  box-sizing: border-box;
  border-right: 1px solid rgb(208, 202, 202);
}

.search-bar {
  padding: 0;
  border: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
}

.search-bar-option {
  border-bottom: 1px solid rgb(239, 227, 227);
  transition: all 0.5s ease;
}
.search-bar-option:hover {
  cursor: pointer;
  background-color: gainsboro;
  border-radius: 14px;
}
.search-bar-option:focus,
.search-bar-option:focus-visible {
  outline: 1px solid rgba(156, 152, 152, 0.5);
}

.bar-option-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
</style>
