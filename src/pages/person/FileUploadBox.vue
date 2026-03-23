<script setup lang="ts" name="FileUploadBox">
import { ref, useTemplateRef } from "vue";

const files = ref<File[]>([]);
const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
function trigger() {
  fileInput.value?.click();
}
async function handleChange(event: Event) {
  const rawFiles = (event.target as HTMLInputElement).files;

  // 如果原FileList对象不为空
  if (rawFiles !== null) {
    // 已选文件名数组
    const fileNames = files.value.map((file) => file.name);
    for (let rawFile of rawFiles) {
      // 排除同名文件
      if (!fileNames.includes(rawFile.name)) {
        files.value.push(rawFile);
      }
    }
  }
}
function removeFile(index: number) {
  files.value.splice(index, 1);
}
</script>

<template>
  <div class="box">
    <div class="show">
      <div class="block" v-for="(file, index) in files" :key="index">
        <!-- 删除按钮，使用事件修饰符来阻止事件冒泡 -->
        <button class="delete-btn" @click.stop="removeFile(index)">×</button>
        <span>{{ file.name }}</span>
        <span>{{ file.size }}</span>
      </div>
    </div>
    <input
      type="file"
      accept=".md"
      ref="fileInput"
      @change="handleChange"
      style="display: none"
      multiple
    />
    <button id="upload-btn" @click="trigger">upload</button>
  </div>
</template>

<style scoped>
.box {
  --font-size: 14px;
  --font-size-relative: 7px;
  display: flex;
  flex-direction: column;
  font-size: var(--font-size);
}

.show {
  display: flex;
  overflow-x: visible;
  overflow-y: hidden;
  clip-path: inset(0 round var(--font-size));
  width: 250px;
  height: 80px;
  box-sizing: border-box;
  padding: var(--font-size);
  border: 1px solid gray;
  border-radius: var(--font-size);
  background-color: #f1f1f1;
}
.show::-webkit-scrollbar {
  height: 8px;
}
.show::-webkit-scrollbar-track {
  background: transparent;
  border-radius: var(--font-size);
}
.show::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 12px;
}
.show::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.block {
  position: relative;
  display: flex;
  /* 防止变形 */
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--font-size);
  border: 1px solid gray;
  border-radius: var(--font-size);
  margin-right: var(--font-size);
}

.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  /* 圆 */
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  display: none; /* 默认隐藏 */
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
}

.block:hover .delete-btn {
  display: flex; /* 悬停时显示 */
}

#upload-btn {
  margin-top: 10px;
}
</style>
