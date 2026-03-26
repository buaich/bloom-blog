import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", () => {
  let currentTheme = localStorage.getItem("theme") || "light";

  function applyTheme() {
    const html = document.documentElement;

    if (currentTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    localStorage.setItem("theme", currentTheme);
  }

  function toggleTheme() {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme();
  }

  return {
    currentTheme,
    toggleTheme,
    applyTheme,
  };
});
