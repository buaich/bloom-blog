// composables/useCodeHighlight.ts
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { convertCodeBlock } from "@/utils/converter";

export function useCodeBlock(htmlString: string | (() => string)) {
  const processedHtml = ref("");
  let isClient = false;

  // 仅在客户端执行转换，避免SSR时 DOMParser报错
  const update = (source: string) => {
    if (typeof window !== "undefined") {
      try {
        processedHtml.value = convertCodeBlock(source);
      } catch (e) {
        console.error("Code highlight failed:", e);
        processedHtml.value = source;
      }
    } else {
      processedHtml.value = source;
    }
  };

  if (typeof htmlString === "function") {
    watchEffect(() => {
      update(htmlString());
    });
  } else {
    onMounted(() => {
      update(htmlString);
    });
  }

  return {
    processedHtml,
  };
}
