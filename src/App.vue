<script setup lang="ts">
import HomeMenu from "./components/HomeMenu.vue";
</script>

<template>
  <div class="root">
    <HomeMenu />
    <div class="login-part" v-if="!$route.meta.hideDefault">
      <router-view name="default" />
    </div>
  </div>
</template>

<style scoped>
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
