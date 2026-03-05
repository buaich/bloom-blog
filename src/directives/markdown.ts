// markdown.ts
import { nextTick, type Directive, type DirectiveBinding } from "vue";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import mermaid from "mermaid";
import hljs from "highlight.js/lib/core";

// 按需注册语言
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import java from "highlight.js/lib/languages/java";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import plaintext from "highlight.js/lib/languages/plaintext";

// 注册高亮的语言
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("java", java);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("plaintext", plaintext);

// mermaid初始化一次
mermaid.initialize({ startOnLoad: false, theme: "default" });

//自定义Mermaid图的renderer
const renderer = new marked.Renderer();
const originalCode = renderer.code.bind(renderer);
renderer.code = (args) => {
  // mermaid代码块直接返回特定div
  if (args.lang === "mermaid") {
    return `<div class="mermaid">${args.text}</div>`;
  }
  return originalCode(args);
};

// 配置marked：先用markedHighlight，再用renderer
marked.use(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
);
marked.setOptions({ renderer });

// 辅助函数
async function renderMermaid(el: HTMLElement) {
  // 需要在下一个事件循环中渲染
  await nextTick();
  const nodes = el.querySelectorAll<HTMLElement>(".mermaid");
  if (!nodes.length) return;

  nodes.forEach((n) => n.removeAttribute("data-processed"));
  await mermaid.run({ nodes: Array.from(nodes) });
}

// 自定义指令v-markdown
const vMarkdown: Directive = {
  async mounted(el, binding) {
    el.classList.add("markdown-body");
    el.innerHTML = await marked.parse(binding.value ?? "");
    await renderMermaid(el);
  },

  async updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    el.innerHTML = await marked.parse(binding.value ?? "");
    await renderMermaid(el);
  },
};

export default vMarkdown;
