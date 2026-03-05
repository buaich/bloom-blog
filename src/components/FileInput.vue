<script setup lang="ts" name="FileInput">
import { ref } from "vue";
import { useNoteStore } from "@/store/noteStore";
import { parseMarkdownFile } from "@/utils/fileParser";

//
const fileInput = ref<HTMLInputElement>();
const selectedFile = ref<File | null>(null);

// 触发隐藏文件输入框的点击
const trigger = () => {
  fileInput.value?.click();
};
const handleFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  selectedFile.value = input.files?.[0] || null;
};

//
//获取 关于笔记的store
const noteStore = useNoteStore();

// 上传选择的本地文件
async function upload() {
  if (!selectedFile.value) return;

  // 解析.md文件
  const { noteTitle, noteContent } = await parseMarkdownFile(
    selectedFile.value,
  );

  // 封装NoteData(本地)
  const noteData = {
    noteTitle,
    noteContent,
    createWay: "LOCAL",
  };

  // Action 发送笔记
  await noteStore.upload(noteData);
}
</script>

<template>
  <div class="file-input-wrapper">
    <!-- 隐藏的原生输入框 -->
    <input
      ref="fileInput"
      type="file"
      accept=".md"
      @change="handleFile"
      class="hidden-file-input"
    />

    <!-- 选择本地笔记按钮 -->
    <button @click="trigger" class="select-file-button">select</button>

    <!-- 显示已选文件名 -->
    <p class="file-name-display">
      {{ selectedFile?.name }}
    </p>

    <!-- 上传本地笔记按钮 -->
    <button @click="upload" class="upload-file-button">upload</button>
  </div>
</template>

<style scoped>
.file-input-wrapper {
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 40px;
  border: 1px solid transparent;
  border-radius: 14px;
  overflow: hidden;
  background-color: rgba(201, 199, 199, 0.4);
}

/* 隐藏原生文件输入框 */
.hidden-file-input {
  display: none;
}

.select-file-button,
.upload-file-button {
  border: none;
  border-radius: 14px;
  font-size: 1em;
  padding: 0.6em 1.2em;
  background: rgba(16, 15, 15, 0.6);
  color: whitesmoke;
}
.upload-file-button {
  background-color: saddlebrown;
}
.select-file-button:hover {
  transform: translateY(-0.5px);
  background: rgba(16, 15, 15, 0.9);
}

.file-name-display {
  flex: 1; /* 填满剩余空间 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
  font-size: 14px;
}
</style>
