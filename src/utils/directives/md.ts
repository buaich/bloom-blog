import type { Directive, DirectiveBinding } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

marked.setOptions({
  gfm: true,
  breaks: true, //将换行转变为<br>元素
});

/**
 * 为所有代码块添加主题切换按钮
 * @param container 指令绑定的容器元素
 */
function enhanceCodeBlocks(container: HTMLElement) {
  // 移除之前添加的按钮，防止重复
  container.querySelectorAll(".code-theme-btn").forEach((btn) => btn.remove());

  container.querySelectorAll("pre").forEach((pre) => {
    // 确保 pre 是相对定位，便于按钮绝对定位
    if (getComputedStyle(pre).position === "static") {
      pre.style.position = "relative";
    }

    // 如果 pre 还没有任何主题类，默认添加 light 主题
    if (
      !pre.classList.contains("github-light") &&
      !pre.classList.contains("github-dark")
    ) {
      pre.classList.add("github-light");
    }

    // 创建切换按钮
    const btn = document.createElement("button");
    btn.className = "code-theme-btn";
    btn.textContent = "切换主题";

    // 点击事件：在 light / dark 主题间切换
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (pre.classList.contains("github-light")) {
        pre.classList.remove("github-light");
        pre.classList.add("github-dark");
      } else {
        pre.classList.remove("github-dark");
        pre.classList.add("github-light");
      }
    });

    pre.appendChild(btn);
  });
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const raw = binding.value || "";
    const html = marked.parse(raw) as string;
    el.innerHTML = DOMPurify.sanitize(html);
    enhanceCodeBlocks(el); // 添加主题切换按钮
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    // 仅当绑定值变化时才重新渲染
    if (binding.value !== binding.oldValue) {
      const raw = binding.value || "";
      const html = marked.parse(raw) as string;
      el.innerHTML = DOMPurify.sanitize(html);
      enhanceCodeBlocks(el); // 重新添加按钮
    }
  },
} as Directive<HTMLElement, string>;
