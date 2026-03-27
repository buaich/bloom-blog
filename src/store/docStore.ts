import { defineStore } from "pinia";
import { ref } from "vue";
import http from "@/utils/network/http";
import type Doc from "@/definitions/types/doc";

export const useDocStore = defineStore("doc", () => {
  const affiliateMap = ref<Map<string, Map<string, Doc>>>(new Map());

  /**
   * 获取指定关联的文档名称列表
   * @param {string} docAffiliate - 隶属技术名称
   * @return {undefined}
   */
  async function getDocNameList(docAffiliate: string) {
    // 检查参数是否为空或null，为空则直接返回
    if (docAffiliate === "" || docAffiliate === null) return;
    if (affiliateMap.value.has(docAffiliate)) return;

    affiliateMap.value.set(docAffiliate, new Map()); // 初始化

    let result = await http.get(`/doc/${docAffiliate}`);
    console.log("<docStore.ts>", result.data);
    if (result?.data !== undefined) {
      result.data.forEach((docName: string) => {
        affiliateMap.value.get(docAffiliate)?.set(docName, {} as Doc);
      });
    }
  }

  async function getSpecificDoc(docAffiliate: string, docName: string) {
    const doc = affiliateMap.value.get(docAffiliate)?.get(docName);

    // 若对应文档存在，则直接返回
    if (doc?.docId) return;

    let result = await http.get(`/doc/${docAffiliate}/${docName}`);

    // 将一个Doc对象存储到affiliateMap中，key为docName
    if (result?.data !== undefined) {
      affiliateMap.value.get(docAffiliate)?.set(docName, result.data);
    }
  }

  return { getDocNameList, affiliateMap, getSpecificDoc };
});
