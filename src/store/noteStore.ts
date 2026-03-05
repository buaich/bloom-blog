import type { NoteData } from "@/types/NoteData";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useNoteStore = defineStore("note", () => {
  // State
  const loading = ref(false);
  const error = ref<string | null>(null);
  const noteList = ref();

  // Action
  // (1)上传笔记数据
  async function upload(noteData: NoteData) {
    loading.value = true; //表示正在上传
    error.value = null; //目前没有错误

    try {
      const response = await axios.post(
        "http://localhost:8080/note/add",
        noteData,
      );
    } catch (error: any) {
      error.value = "<Error>upload() !";
    }
  }

  // (2)获取Vue相关的所有笔记
  async function search(name: string) {
    loading.value = true; //表示正在获取
    error.value = null;

    try {
      console.log(name);
      const response = await axios.get("http://localhost:8080/note/search", {
        params: {
          name,
        },
      });

      noteList.value = response?.data;
    } catch (error) {}
  }

  // (3)重置笔记列表
  function clean() {
    noteList.value = [];
  }
  return { loading, error, noteList, upload, search, clean };
});
