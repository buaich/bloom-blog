/**
 * 创建代码块包装元素
 * @param {HTMLElement} pre 原始 pre 元素
 * @param {string} language 语言
 * @return {HTMLElement} 代码块包装元素
 */
export function wrapCodeBlock(pre: HTMLElement, language: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "code-block-wrapper";

  const newPre = pre.cloneNode(true) as HTMLElement;
  newPre.classList.add("code-block-pre");
  wrapper.appendChild(newPre);

  const langTag = document.createElement("div");
  langTag.className = "code-lang-tag";
  langTag.textContent = language;
  wrapper.appendChild(langTag);

  const copyBtn = document.createElement("div");
  copyBtn.className = "code-copy-btn";
  copyBtn.textContent = "copy";
  copyBtn.setAttribute("data-copy", "true");
  wrapper.appendChild(copyBtn);

  return wrapper;
}

/**
 * 从代码元素的lang属性中获取语言
 * @param {HTMLElement} code 代码元素
 * @return {string} 语言
 */
export function getLanguage(code: HTMLElement): string {
  return code.lang || "";
}
