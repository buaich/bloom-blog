<script setup lang="ts" name="MarkdownConverter">
import MarkdownIt from "markdown-it";
import { computed } from "vue";

const props = defineProps({
  rawString: {
    type: String,
    default: "",
  },
});

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const result = computed(() => {
  return md.render(props.rawString);
});
</script>

<template>
  <div v-html="result"></div>
</template>

<style scoped></style>
