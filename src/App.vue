<script setup lang="ts">
import HomeMenu from "./components/HomeMenu.vue";
import DocsTest from "./test/DocsTest.vue";
</script>

<template>
  <div class="root">
    <HomeMenu />
    <div class="login-part" v-if="!$route.meta.hideDefault">
      <router-view name="default" />
    </div>
  </div>
  <DocsTest></DocsTest>
</template>

<style scoped>
/* 全局 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 全局字体设置 */
:global(body) {
  font-family: "Fira Sans";
  font-size: 16px;
}

:global(code),
:global(pre) {
  font-family: "Fira Code";
}

.login-part,
.note-part {
  margin-top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 625px;
  /* font-size: 15px; */
  background-color: rgb(243, 246, 249);
  gap: 14px;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 14px;
}
</style>
