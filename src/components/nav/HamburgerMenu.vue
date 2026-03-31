<script setup lang="ts" name="HamburgerMenu">
import { ref } from "vue";

let isOpen = ref<boolean>(false);
const closeMenu = () => {
  isOpen.value = false;
};
const toggleMenuStatus = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="hamburger-wrapper">
    <button class="hamburger-btn" type="button" @click="toggleMenuStatus">
      <svg
        t="1774934437589"
        class="hamburger-btn-logo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7435"
      >
        <path
          d="M370.688 102.4 200.192 102.4C140.288 102.4 92.16 150.528 92.16 210.432l0 170.496c0 59.392 48.128 108.032 108.032 108.032l170.496 0c59.392 0 108.032-48.128 108.032-108.032L478.72 210.432C478.72 150.528 430.592 102.4 370.688 102.4z"
          p-id="7436"
        ></path>
        <path
          d="M370.688 552.96 200.192 552.96c-59.392 0-108.032 48.128-108.032 108.032l0 170.496c0 59.392 48.128 108.032 108.032 108.032l170.496 0c59.392 0 108.032-48.128 108.032-108.032l0-170.496C478.72 601.088 430.592 552.96 370.688 552.96z"
          p-id="7437"
        ></path>
        <path
          d="M943.104 219.136l-120.832-120.832c-41.984-41.984-110.592-41.984-152.576 0l-120.832 120.832c-41.984 41.984-41.984 110.592 0 152.576l120.832 120.832c41.984 41.984 110.592 41.984 152.576 0l120.832-120.832C985.6 329.728 985.6 261.632 943.104 219.136z"
          p-id="7438"
        ></path>
        <path
          d="M831.488 552.96l-170.496 0c-59.392 0-108.032 48.128-108.032 108.032l0 170.496c0 59.392 48.128 108.032 108.032 108.032l170.496 0c59.392 0 108.032-48.128 108.032-108.032l0-170.496C939.52 601.088 891.392 552.96 831.488 552.96z"
          p-id="7439"
        ></path>
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="overlay" @click="closeMenu"></div>
    </Transition>
    <Transition name="slide">
      <div v-if="isOpen" class="hamburger-content" @select="closeMenu"></div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.hamburger-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding-right: calc(var(--font-size) * 1.5);
}
.hamburger-btn-logo {
  fill: var(--font-clr-one);
  width: calc(var(--font-size) * 1.5);
  height: calc(var(--font-size) * 1.5);
}
.overlay {
  position: fixed;
  top: 55px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-clr);
  z-index: 1000;
}
</style>
