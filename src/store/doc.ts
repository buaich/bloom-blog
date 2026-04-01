import { defineStore } from "pinia";
import { shallowRef, type Component } from "vue";

export const useDocStore = defineStore("doc", () => {
  // 技术→首先展示的文档名
  const firstMap: Map<string, string[]> = new Map([
    ["Vue", ["vued", "HelloVue3"]],
    ["Css", ["cssd", "Flexbox"]],
  ]);
  // 技术→目录名
  const dirMap: Map<string, string> = new Map([
    ["Vue", "vued"],
    ["JavaScript", "jsd"],
    ["Css", "cssd"],
  ]);
  // 技术→所有文档名
  const skillMap: Map<string, string[]> = new Map([
    [
      "Vue",
      [
        "HelloVue3",
        "Reactive",
        "SetupCandy",
        "ScopedCss",
        "VueDirective",
        "Props",
        "ComponentChat",
        "TemplateRef",
        "LifeCycle",
      ],
    ],
    ["Css", ["Flexbox"]],
  ]);

  // 当前展示的Markdown组件
  const current = shallowRef<Component | null>(null);

  /**
   * 初次加载Markdown组件
   * @param {string} skillName 技术名称
   */
  async function loadFirst(skillName: string) {
    if (!skillName) {
      current.value = null;
      return;
    }

    try {
      const module = await import(
        `@/assets/docs/${firstMap.get(skillName)![0]}/${firstMap.get(skillName)![1]}.md`
      );
      const component = module.default;
      current.value = component;
    } catch (error) {
      console.error("Failed to load component:", error);
      current.value = null;
    }
  }

  async function loadMarkdownComponent(skillName: string, docName: string) {
    if (!skillName || !docName) {
      current.value = null;
      return;
    }

    try {
      const module = await import(
        `@/assets/docs/${dirMap.get(skillName)}/${docName}.md`
      );
      const component = module.default;
      current.value = component;
    } catch (error) {
      console.error("Failed to load component:", error);
      current.value = null;
    }
  }

  return {
    firstMap,
    current,
    dirMap,
    skillMap,
    loadFirst,
    loadMarkdownComponent,
  };
});
