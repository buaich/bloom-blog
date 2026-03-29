<script lang="ts" setup name="BlogHome">
import HomeLogo from "./HomeLogo.vue";
</script>

<template>
  <div class="container">
    <HomeLogo></HomeLogo>
    <div class="home-title">
      <span class="home-title__letter">B </span>
      <span class="home-title__letter">l </span>
      <span class="home-title__letter">o </span>
      <span class="home-title__letter">o </span>
      <span class="home-title__letter">m </span>
      <span class="home-title__letter">' </span>
      <span class="home-title__letter">s </span>
      <span class="home-title__letter">&nbsp; </span>
      <span class="home-title__word">world</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  --font-size: 16px;
}

@media (max-width: 750px) {
  .container {
    --font-size: 10px;
  }
}

.container {
  width: 100%;
  height: 100%;
  padding: 0 calc(var(--font-size) / 2);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--font-clr-one);
}

.home-title__letter,
.home-title__word {
  font-size: calc(var(--font-size) * 4);
  font-weight: 700;
  display: inline-block;
  text-shadow: calc(var(--font-size) / 8) calc(var(--font-size) / 8)
    calc(var(--font-size) / 8) var(--font-clr-two);

  opacity: 0;
  animation: wordsDisplay 1s forwards;
  transition: all 1s ease-in;
}

.home-title__letter:nth-child(1) {
  animation-delay: 0.05s;
}
.home-title__letter:nth-child(2) {
  animation-delay: 0.1s;
}
.home-title__letter:nth-child(3) {
  animation-delay: 0.15s;
}
.home-title__letter:nth-child(4) {
  animation-delay: 0.2s;
}
.home-title__letter:nth-child(5) {
  animation-delay: 0.25s;
}
.home-title__letter:nth-child(6) {
  animation-delay: 1s;
}
.home-title__letter:nth-child(7) {
  animation-delay: 0.35s;
}
.home-title__letter:nth-child(8) {
  animation-delay: 0.4s;
}
.home-title__letter:nth-child(9) {
  animation-delay: 0.45s;
}

@keyframes wordsDisplay {
  0% {
    opacity: 0;
    margin-top: 0px;
  }
  25% {
    opacity: 0.25;
    margin-top: 20px;
  }
  50% {
    opacity: 0.5;
    margin-top: 20px;
  }
  75% {
    opacity: 0.75;
    margin-top: 20px;
  }
  100% {
    opacity: 1;
    margin-top: 0px;
  }
}

.home-title__letter:nth-of-type(1):hover {
  transform: translateY(var(--font-size));
}
.home-title__letter:nth-of-type(2):hover {
  transform: translateY(calc(var(--font-size) * -1));
}
.home-title__letter:nth-of-type(3):hover {
  transform: translateX(var(--font-size));
}
.home-title__letter:nth-of-type(4):hover {
  transform: translateX(calc(var(--font-size) * -1));
}
.home-title__letter:nth-of-type(5):hover {
  transform: rotate(360deg);
}
.home-title__letter:nth-of-type(6):hover {
  transform: scale(1.5);
}
.home-title__letter:nth-of-type(7):hover {
  transform: skewX(-30deg);
}
</style>
