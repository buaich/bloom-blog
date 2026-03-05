<script setup lang="ts" name="NoteBox">
import emitter from "@/utils/emitter";
import { ref } from "vue";

const note = ref<string>();

emitter.on("note", (data) => {
  console.log("<NoteShowBox.vue>:recieve note");
  note.value = data as string;
});
</script>

<template>
  <div class="note-box-wrapper">
    <div v-markdown="note"></div>
  </div>
</template>

<style scoped>
.note-box-wrapper {
  width: 85%;
  height: 100%;
  background-color: transparent;
  overflow: auto;
}
</style>
