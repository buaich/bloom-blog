<script setup lang="ts" name="Docs">
import MarkdownConverter from "./MarkdownConverter.vue";
const rawString = "##### （1）Symbol.hasInstance";
</script>

<template>
  <div><MarkdownConverter :raw-string="rawString"></MarkdownConverter></div>
</template>

<style scoped></style>
