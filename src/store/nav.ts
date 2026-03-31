import { defineStore } from "pinia";

export const navStore = defineStore("nav", () => {
  // 菜单选项→技术列表
  const menuMap: Map<string, string[]> = new Map([
    ["Docs", ["Vue"]],
    ["UI", ["Form", "Button", "Block"]],
    ["About", ["Me", "Github"]],
  ]);

  const menuObj: Record<string, string[]> = {};
});
