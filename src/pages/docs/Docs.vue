<script setup lang="ts" name="Docs"></script>

<template>
  <div class="doc">
    <div class="doc__list"></div>
    <div class="doc__content"></div>
    <div class="doc__details"></div>
  </div>
</template>

<style scoped>
.doc {
  --list-width: 250px;
}
.doc {
  display: flex;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  background-color: black;
  width: 100%;
  height: 100%;
}
.doc__list {
  width: var(--list-width);
  background-color: aqua;
}
.doc__content {
  flex: 1;
  background-color: pink;
}
.doc__details {
  width: var(--list-width);
  background-color: red;
}
</style>
