import { defineStore } from "pinia";
import { usePreferredDark } from "@vueuse/core";

export const useThemeStore = defineStore("theme", () => {
  const isDark = usePreferredDark(); //获取系统主题偏好
  let currentTheme: "light" | "dark" = isDark.value ? "dark" : "light"; //初始主题状态

  function toggleTheme() {
    // 切换主题状态
    console.log(isDark.value);
    currentTheme = currentTheme === "light" ? "dark" : "light";
    const html = document.documentElement;

    if (currentTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  return {
    currentTheme,
    toggleTheme,
  };
});
