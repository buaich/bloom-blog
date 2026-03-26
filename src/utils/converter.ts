import { wrapCodeBlock, getLanguage } from "./wrapper";
import { highlightCodeBlock } from "./highlight";

function isHtmlStringValid(htmlString: string): boolean {
  return (
    htmlString !== undefined && htmlString !== null && htmlString.trim() !== ""
  );
}

/**
 * 对HTML字符串进行代码高亮处理
 * @param {string} htmlString 输入的HTML字符串
 * @return {string} 高亮后的HTML字符串
 */
export function convertCodeBlock(htmlString: string): string {
  if (!isHtmlStringValid(htmlString)) return "";

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const body = doc.body;

    const preElements = body.querySelectorAll("pre");
    preElements.forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;

      const codeText = code.textContent || "";
      const language = getLanguage(code);

      // 高亮处理
      const result = highlightCodeBlock(codeText, language);

      // 替换code元素
      const newCode = document.createElement("code");
      newCode.innerHTML = result;
      newCode.className = `language-${language} hljs`;
      code.parentNode?.replaceChild(newCode, code);

      // 构建包装器并替换原pre元素
      const wrapper = wrapCodeBlock(pre, language);
      pre.parentNode?.replaceChild(wrapper, pre);
    });

    return body.innerHTML;
  } catch (error) {
    console.error(error);
    return htmlString;
  }
}
