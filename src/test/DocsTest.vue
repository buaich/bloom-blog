<script setup lang="ts" name="DocsTest">
import { useDocsStore } from "@/store/docsStore";

const store = useDocsStore();
const { getDocs } = store;
</script>

<template>
  <div>
    <button @click="getDocs('Vue')">get</button>
  </div>
</template>

<style scoped></style>
