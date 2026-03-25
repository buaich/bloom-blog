import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/atom-one-dark.css"; // 高亮主题

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

export const languageNameMap: Record<string, string> = {
  javascript: "Javascript",
  js: "Javascript",
  typescript: "Typescript",
  ts: "Typescript",
  python: "Python",
  py: "Python",
  html: "HTML",
  xml: "XML",
  css: "CSS",
  json: "JSON",
  bash: "Bash",
  shell: "Shell",
  mermaid: "Mermaid",
  plaintext: "Plain text",
  text: "Plain text",
};

/**
 * 从代码元素的lang属性中获取语言
 * @param {HTMLElement} code 代码元素
 * @return {string} 语言
 */
function getLanguageFromLangAttribute(code: HTMLElement): string {
  return code.lang || "";
}

/**
 * 对代码进行高亮
 * @param {string} codeText 代码文本
 * @param {string} language 语言
 * @return {string} 高亮后的HTML
 * @return {string} 语言
 */
function highlightCode(
  codeText: string,
  language: string,
): { html: string; language: string } {
  // 自动检测代码的语言并应用语法高亮
  if (!language) {
    try {
      const result = hljs.highlightAuto(codeText);
      return { html: result.value, language: result.language || "plaintext" };
    } catch {
      return { html: codeText, language: "plaintext" };
    }
  }

  // 如果语言已注册，应用对应高亮
  if (hljs.getLanguage(language)) {
    try {
      const result = hljs.highlight(codeText, {
        language: language,
        ignoreIllegals: true,
      });
      return { html: result.value, language: language };
    } catch (error) {
      console.warn(
        `<highlightCode()>Highlight failed for language: ${language}`,
        error,
      );
    }
  }
  // 不进行高亮，直接返回原始文本
  return { html: codeText, language: language };
}

/**
 * 创建代码块包装元素
 * @param {HTMLElement} pre 原始 pre 元素
 * @param {string} language 语言
 * @return {HTMLElement} 代码块包装元素
 */
function createWrapper(pre: HTMLElement, language: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "code-block-wrapper";

  const newPre = pre.cloneNode(true) as HTMLElement;
  newPre.classList.add("code-block-pre");
  wrapper.appendChild(newPre);

  const langTag = document.createElement("div");
  langTag.className = "code-lang-tag";
  langTag.textContent = languageNameMap[language] || language; // 友好名称
  wrapper.appendChild(langTag);

  const copyBtn = document.createElement("div");
  copyBtn.className = "code-copy-btn";
  copyBtn.textContent = "copy";
  copyBtn.setAttribute("data-copy", "true");
  wrapper.appendChild(copyBtn);

  return wrapper;
}
/**
 * 对HTML字符串进行代码高亮处理
 * @param {string} htmlString 输入的HTML字符串
 * @return {string} 高亮后的HTML字符串
 */
export function convertCode(htmlString: string): string {
  console.log("<convertCode()>input:", String);
  if (!htmlString || htmlString.trim() === "") return "";

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const body = doc.body;

    const preElements = body.querySelectorAll("pre");
    preElements.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;

      const codeText = code.textContent || "";
      const language = getLanguageFromLangAttribute(code);

      // 高亮处理
      const result = highlightCode(codeText, language);

      // 替换code内容
      const newCode = document.createElement("code");
      newCode.innerHTML = result.html;
      newCode.className = `language-${result.language} hljs`;
      code.parentNode?.replaceChild(newCode, code);

      // 构建包装器并替换原 pre
      const wrapper = createWrapper(pre, result.language);
      pre.parentNode?.replaceChild(wrapper, pre);
    });

    return body.innerHTML;
  } catch (error) {
    console.error("convertCode error:", error);
    return htmlString;
  }
}
