<script setup lang="ts" name="MarkdownWrapper">
import { watchEffect } from "vue";
import { useThemeStore } from "@/store/theme";

const themeStore = useThemeStore();
const loadHighlightTheme = (theme: string) => {
  const linkId = "highlight-theme";
  let link = document.getElementById(linkId) as HTMLLinkElement | null;
  const { themeMap } = themeStore;
  const href = themeMap[theme] || themeMap.light;

  if (link) {
    // 直接更新 href
    link.href = href || "";
  } else {
    // 创建新 link 标签
    link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = href || "";
    document.head.appendChild(link);
  }
};

// 监听主题变化，动态切换高亮主题
watchEffect(() => {
  loadHighlightTheme(themeStore.currentTheme);
});
</script>

<template>
  <div class="markdown-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.markdown-wrapper {
  background-color: var(--bg-clr);
}
</style>
