import { defineStore } from "pinia";
import { usePreferredDark } from "@vueuse/core";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = usePreferredDark(); //获取系统主题偏好
  let currentTheme = ref(isDark.value ? "dark" : "light"); //初始主题状态
  const themeMap: Record<string, string> = {
    light:
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css",
    dark: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark-dimmed.min.css",
  };

  function toggleTheme() {
    // 切换主题状态
    console.log(isDark.value);
    currentTheme.value = currentTheme.value === "light" ? "dark" : "light";
    const html = document.documentElement;

    if (currentTheme.value === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  return {
    currentTheme,
    toggleTheme,
    themeMap,
  };
});
