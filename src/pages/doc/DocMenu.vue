<script setup lang="ts" name="DocMenu">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import DocSidebar from "./DocSidebar.vue";

const route = useRoute();
const skill = ref<string>(route.params.skill as string); // 获取当前技术参数
const isOpen = ref(false); // 侧边栏显示状态
const toggleSidebarStatus = () => {
  isOpen.value = !isOpen.value;
}; // 切换侧边栏显示状态
const closeSidebar = () => {
  isOpen.value = false;
}; // 关闭侧边栏

watch(
  () => route.path,
  () => {
    closeSidebar(); //路由变化时关闭侧边栏
  },
);
</script>

<template>
  <div class="menu">
    <button class="menu-btn" type="button" @click="toggleSidebarStatus">
      <svg
        t="1774868009023"
        class="menu-btn-logo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2503"
        width="48"
        height="48"
      >
        <path
          d="M886.67 256.13H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.19-4.21 9.41-9.41 9.41zM886.67 545.22H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.2-4.21 9.41-9.41 9.41zM886.67 832.32H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.2-4.21 9.41-9.41 9.41z"
          p-id="2504"
        ></path>
      </svg>
      <span class="menu-btn-text">content</span>
    </button>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="overlay" @click="closeSidebar"></div>
    </Transition>
    <Transition name="slide">
      <div v-if="isOpen" class="sidebar">
        <DocSidebar :skill="skill" @select="closeSidebar" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.menu {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-clr);
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-clr);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-btn {
  display: flex;
  align-items: center;
  border: none;
  padding: 0 calc(var(--font-size) * 2);
  cursor: pointer;
  background-color: transparent;
  color: var(--font-clr-one);
}

.menu-btn-logo {
  fill: var(--font-clr-one);
  width: var(--font-size);
  height: var(--font-size);
  margin-right: calc(var(--font-size) / 2);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background-color: var(--bg-clr);
  z-index: 1001;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
