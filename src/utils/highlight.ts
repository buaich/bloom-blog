import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("vue", xml);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);

/**
 * 对代码进行高亮
 * @param {string} codeText 代码文本
 * @param {string} language 语言
 * @return {string} 高亮后的HTML
 * @return {string} 语言
 */
export function highlightCodeBlock(codeText: string, language: string): string {
  // 如果语言已注册，应用对应高亮
  if (hljs.getLanguage(language)) {
    try {
      const result = hljs.highlight(codeText, {
        language: language,
        ignoreIllegals: true,
      });

      return result.value;
    } catch (error) {
      console.warn(error);
    }
  }
  return codeText;
}
