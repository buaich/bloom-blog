import { defineStore } from "pinia";
import { ref } from "vue";
import type { ResponseBody } from "@/definitions/types/responseBody";
import http from "@/utils/network/http";

export const useDocsStore = defineStore("docs", () => {
  // State
  let docsMap = ref<Map<string, []>>();
  let docsData = ref<ResponseBody<Map<string, []>>>();

  async function getDocs(docsName: string) {
    if (docsName === "" || docsName === null) return;
    if (docsMap.value?.has(docsName)) return; //若希望获取的文档数组存在

    docsData.value = await http.get(`/docs/${docsName}`);
    if (docsData.value?.data !== undefined) {
      docsMap.value?.set(docsName, docsData.value.data.get(docsName) ?? []);
    }
  }

  return { docsMap, docsData, getDocs };
});
