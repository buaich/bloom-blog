<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { Docs } from "@/definitions/enums/docs.enum";
import { UI } from "@/definitions/enums/ui.enum";
import { Auth } from "@/definitions/enums/auth.enums";
import ThemeButton from "./ThemeButton.vue";

// 下拉框选项
const dropdownLists = ref([
  {
    text: "Docs",
    children: Object.values(Docs),
    isShow: false,
  },
  {
    text: "UI",
    children: Object.values(UI),
    isShow: false,
  },
  {
    text: "More",
    children: ["..."],
  },
  {
    text: "Auth",
    children: Object.values(Auth),
  },
]);

//拿到路由器
const router = useRouter();
/**
 * @description 路由跳转
 * @param {string} prefix - 路由前部分
 * @param {string} suffix - 路由后部分
 * @returns {undefined}
 */
function jump(prefix: string, suffix: string) {
  router.push(`/${prefix.toLowerCase()}/${suffix.toLowerCase()}`);
}

function goToAuth() {
  router.push("/auth/login");
}

// 搜索框中的关键词
let keywords = ref("");
const searchInput = useTemplateRef<HTMLInputElement>("searchInput");
/**
 * @description 搜索聚焦
 * @param {Event} event - 当前事件对象
 * @returns {undefined}
 */
function focus(event: KeyboardEvent) {
  // 阻止默认行为
  if ((event.ctrlKey || event.metaKey) && event.key === "f") {
    event.preventDefault();

    // 获取焦点
    searchInput.value?.focus();
  }
}
onMounted(() => window.addEventListener("keydown", focus));
onUnmounted(() => window.removeEventListener("keydown", focus));
</script>

<template>
  <div class="home-menu">
    <!-- 网站标识 -->
    <svg
      t="1772689824065"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3094"
      width="30"
      height="30"
    >
      <path
        d="M705.5 136.5h-391c-108 0-195.5 87.5-195.5 195.3v293.9c1.5 69 42 113.6 85.5 161.2l80.3 80.3c11.6 8.9 19 12 29.7 11.8 10.7 0.3 21.5-3.6 29.7-11.8l46.2-46.2h315.1c108 0 195.5-87.5 195.5-195.3V331.8c0-107.8-87.5-195.3-195.5-195.3z m-20.6 360.6c-1.5 7.7-5.2 15.1-11.1 21L520.2 671.7c-15.8 15.8-41.5 15.8-57.3 0-15.8-15.8-15.8-41.5 0-57.3l87-87H353.6c-19.2 0-35.1-13.9-38.4-32.1-2.9-13 0.7-27.2 10.8-37.3l153.6-153.6c15.8-15.8 41.5-15.8 57.3 0 15.8 15.8 15.8 41.4 0 57.3l-87.6 87.6h192.5c4-0.3 8.1-0.2 12 0.7 18.2 3.3 32.1 19.2 32.1 38.4 0.1 3-0.4 5.9-1 8.7z"
        fill="#020202"
        p-id="3095"
      ></path>
    </svg>

    <!-- 主页搜索框 -->
    <div class="search">
      <label class="search-wrapper">
        <svg
          t="1772007313255"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="919"
          width="24"
          height="24"
        >
          <path
            d="M889.6 838.4l-192-192C742.4 595.2 768 524.8 768 448c0-179.2-140.8-320-320-320S128 268.8 128 448s140.8 320 320 320c76.8 0 147.2-25.6 198.4-70.4l192 192c12.8 12.8 32 12.8 44.8 0C896 876.8 896 851.2 889.6 838.4zM192 448c0-140.8 115.2-256 256-256s256 115.2 256 256c0 140.8-115.2 256-256 256S192 588.8 192 448z"
            p-id="920"
          ></path>
        </svg>
        <input
          class="search-box"
          type="text"
          v-model="keywords"
          placeholder="Ctrl+F"
          ref="searchInput"
        />
      </label>
    </div>

    <!-- 空白 -->
    <div></div>

    <!-- 主页菜单中间的下拉框 -->
    <div
      class="dropdown-list-wrapper"
      v-for="(option, index) in dropdownLists"
      :key="index"
      @mouseenter="option.isShow = true"
      @mouseleave="option.isShow = false"
    >
      <span class="dropdown-list">
        {{ option.text }}
        <!-- 只有前两个选项有下拉框 -->
        <svg
          class="dropdown-list-icon"
          viewBox="0 0 1600 1024"
          width="10"
          height="10"
        >
          <path
            d="M0.32 0v369.92L800 1024 1600 369.6V0L828.864 670.464z"
            fill="#2c2c2c"
          />
        </svg>
      </span>

      <!-- 下拉面板具体内容 -->
      <!-- transiton组件（过渡动画的语法糖）没有实体，运行时会被扔掉 -->
      <transition name="fade">
        <ul v-if="option.isShow" class="dropdown-list-details">
          <li
            v-for="child in option.children"
            :key="child"
            @click="jump(option.text, child)"
          >
            {{ child }}
          </li>
        </ul>
      </transition>
    </div>

    <div class="home-theme-wrapper">
      <!-- 主页菜单选项：主题切换 -->
      <ThemeButton :size="10" />
    </div>
  </div>
</template>

<style scoped>
/* #region 首页菜单使用Grid布局 */
.home-menu {
  --transition-standard: 0.3s ease;
}

.home-menu {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  align-items: center;
  justify-items: center;

  width: 100%;
  height: 50px;

  border-bottom: 1px solid rgba(245, 238, 238, 0.8);
}
/* #endregion */

/* #region 下拉框菜单选项样式 */
.dropdown-list-wrapper {
  position: relative;
}
.dropdown-list {
  display: inline-flex;
  align-items: center; /* 垂直居中 */
  gap: 6px; /* 文字与图标间距 */
  transition: color var(--transition-standard);
}
.dropdown-list:hover,
.dropdown-list:hover svg path {
  cursor: pointer;
  color: rgb(160, 157, 157);
  fill: rgb(241, 237, 237);
  transition:
    color 0.1s ease,
    fill 0.1s ease;
}
.dropdown-list-icon {
  flex-shrink: 0; /* 防止svg被挤压变形 */
}
/* 下拉框菜单选项中具体内容 */
.dropdown-list-details {
  position: absolute;
  transform: translate(-2em, 0.5em);

  /* padding: 6px 0; */
  min-width: 100px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* 单个下拉项样式 */
.dropdown-list-details li {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 12px;
  cursor: pointer;
  font-size: 14px;
  color: gray;
  transition: background 0.2s;
}
.dropdown-list-details li:hover {
  color: black;
}

/* 淡入淡出过渡  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-standard);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* #endregion */

/* #region 主页搜索框样式 */
.search-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
}
.search-wrapper > svg {
  transition: all var(--transition-standard);
}
.search-wrapper > svg:hover {
  transform: scale(0.7);
}
.search-box {
  border: none;
  outline: none;
  padding: 0.3em 0.6em;
  width: 55px;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: transform var(--transition-standard);
}

.search-box:focus,
.search-box:focus-visible {
  outline: 2px auto black;
}
/* #endregion */

/* #region 主题切换按钮 */
.home-theme-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* #endregion */
</style>
