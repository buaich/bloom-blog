// composables/useCodeHighlight.ts
import { ref, watchEffect, onMounted, onBeforeUnmount } from "vue";
import { convertCode } from "@/utils/highlight";

export function useCodeHighlight(htmlString: string | (() => string)) {
  const processedHtml = ref("");
  let isClient = false;

  // 仅在客户端执行转换，避免 SSR 时 DOMParser 报错
  const update = (source: string) => {
    if (typeof window !== "undefined") {
      try {
        processedHtml.value = convertCode(source);
      } catch (e) {
        console.error("Code highlight failed:", e);
        processedHtml.value = source;
      }
    } else {
      processedHtml.value = source;
    }
  };

  if (typeof htmlString === "function") {
    // 如果是 getter 函数，使用 watchEffect 响应变化
    watchEffect(() => {
      update(htmlString());
    });
  } else {
    // 如果是静态字符串，只在 mounted 时执行一次（或使用 watch）
    onMounted(() => {
      update(htmlString);
    });
  }

  return {
    processedHtml,
  };
}
