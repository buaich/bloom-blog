<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCodeHighlight } from "@/hooks/useCodeHighlight";

const props = defineProps<{
  htmlString: string;
}>();

const { processedHtml } = useCodeHighlight(() => props.htmlString);

const handleCopyClick = async (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const copyBtn = target.closest(".code-copy-btn");
  if (!copyBtn) return;

  const wrapper = copyBtn.closest(".code-block-wrapper");
  if (!wrapper) return;

  const pre = wrapper.querySelector(".code-block-pre") as HTMLElement;
  const code = pre?.querySelector("code");
  const textToCopy = code?.textContent || pre?.textContent || "";

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyBtn.textContent = "copied";
    setTimeout(() => {
      copyBtn.textContent = "copy";
    }, 2000);
  } catch (err) {
    console.error("copy failed:", err);
    copyBtn.textContent = "failed";
    setTimeout(() => {
      copyBtn.textContent = "copy";
    }, 1500);
  }
};
</script>

<template>
  <div
    @click="handleCopyClick"
    class="code-highlighter"
    v-html="processedHtml"
  ></div>
</template>

<style scoped>
.code-highlighter {
  --font-family: Fira Code, monospace;
  --font-color: black;
}
.code-highlighter {
  font-family: var(--font-family);
  color: var(--font-color);
}

:deep(.code-block-wrapper) {
  position: relative;
  margin: 1em 0;
  border-radius: 6px;
  overflow: hidden;
  background: #1e1e1e;
}

:deep(.code-block-pre) {
  margin: 0;
  padding: 1em;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  background: transparent;
}

:deep(.code-lang-tag),
:deep(.code-copy-btn) {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  backdrop-filter: blur(4px);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

:deep(.code-lang-tag) {
  opacity: 1;
  pointer-events: none;
}

:deep(.code-copy-btn) {
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.code-block-wrapper:hover .code-lang-tag) {
  opacity: 0;
}

:deep(.code-block-wrapper:hover .code-copy-btn) {
  opacity: 1;
}
</style>
