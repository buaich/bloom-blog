import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", () => {
  // 菜单选项→技术列表
  const menuMap: Map<string, string[]> = new Map([
    ["Docs", ["Vue", "Css"]],
    ["Design", ["UI", "Game"]],
    ["About", ["Me", "Github"]],
  ]);

  const menuOptions: { key: string; value: string[] }[] = [
    ...menuMap.entries(),
  ].map(([key, value]) => ({
    key,
    value,
  }));

  return { menuMap, menuOptions };
});
