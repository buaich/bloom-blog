<script setup lang="ts" name="ThemeButton">
import { computed } from "vue";
import { useThemeStore } from "@/store/theme";

const props = defineProps<{ size: number | string }>();
const computedSize = computed(() => props.size + "px");
const themeStore = useThemeStore();
const { currentTheme, toggleTheme } = themeStore;

/**
 * @description 切换主题
 * @return {undefined}
 */
function toggle() {
  toggleTheme();
}
</script>

<template>
  <button
    class="toggle"
    id="toggle-btn"
    role="switch"
    aria-checked="false"
    aria-label="theme toggle button"
    @click="toggleTheme"
    :style="{ '--base-scale': computedSize }"
  >
    <input type="checkbox" class="toggle__input" />
    <div class="toggle__container">
      <div class="toggle__clouds"></div>
      <div class="toggle__stars">
        <svg
          t="1774320433702"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10563"
        >
          <path
            d="M324.806194 324.674065L4.426323 499.910194l320.379871 175.269161 175.236129 320.21471 175.137032-320.21471 320.21471-175.269161L675.179355 324.707097 500.042323 4.426323z"
            p-id="10564"
          ></path>
        </svg>
        <svg
          t="1774320433702"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10563"
        >
          <path
            d="M324.806194 324.674065L4.426323 499.910194l320.379871 175.269161 175.236129 320.21471 175.137032-320.21471 320.21471-175.269161L675.179355 324.707097 500.042323 4.426323z"
            p-id="10564"
          ></path>
        </svg>
        <svg
          t="1774320433702"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="10563"
        >
          <path
            d="M324.806194 324.674065L4.426323 499.910194l320.379871 175.269161 175.236129 320.21471 175.137032-320.21471 320.21471-175.269161L675.179355 324.707097 500.042323 4.426323z"
            p-id="10564"
          ></path>
        </svg>
      </div>
      <div class="toggle__sun">
        <div class="toggle__moon-mask">
          <div class="toggle__crater"></div>
          <div class="toggle__crater"></div>
          <div class="toggle__crater"></div>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.toggle {
  --base-scale: 100px;
  --toggle-width: 5.625em;
  --toggle-height: 2.5em;
  --toggle-bg-light: #1a1a1a;
  --toggle-bg-dark: #1d1f2c;
  --transition-standard: 0.3s ease;

  --pill-radius: 9999em;
  --shadow-highlight: rgba(255, 255, 255, 0.94);

  --cloud-clr-front: #f3fdff;
  --cloud-clr-back: #aacadf;

  --sun-diameter: 2.125em; /* 太阳直径 */
  --sun-clr: #1a1a1a;
  --sun-offset: calc((var(--toggle-height) - var(--sun-diameter)) / 2);
  --shadow-primary: rgba(0, 0, 0, 0.25);
  --halo-clr: rgba(255, 255, 255, 0.1);

  --moon-clr: #c4c9d1;

  --crater-clr: #959db1;

  --star-clr: #fff;
}
.toggle {
  font-size: var(--base-scale); /* 默认可以继承 */
  background: none;
  border: none;
}

.toggle__input {
  display: none;
}

.toggle__container {
  width: var(--toggle-width);
  height: var(--toggle-height);
  background-color: var(--toggle-bg-light);
  border-radius: var(--pill-radius);
  cursor: pointer;
  transition: background-color var(--transition-standard);
  box-shadow: 0.06em 0.06em 0.125em var(--shadow-highlight); /* x, y, blur, spread, color, [inset] */
  position: relative;
  overflow: hidden;
}

.toggle__container::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: var(--pill-radius);
  box-shadow: 0em 0.05em 0.2em rgba(0, 0, 0, 0.5) inset;
  pointer-events: none; /* 不再成为事件触发的target */
}

html.dark .toggle__container {
  background-color: var(--toggle-bg-dark);
}

.toggle__sun {
  width: var(--sun-diameter);
  height: var(--sun-diameter);
  background-color: var(--sun-clr);
  border-radius: 50%;
  overflow: hidden; /* 隐藏超出部分，月亮mask */

  box-shadow:
    0.05em 0.125em 0.125em var(--shadow-primary),
    0em 0.05em 0.125em var(--shadow-primary),
    0.05em 0.05em 0.05em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.05em 0.05em 0em rgba(254, 255, 239, 0.61) inset,
    0 0 0 0.625em var(--halo-clr),
    0 0 0 1.25em var(--halo-clr),
    0 0 0 1.875em var(--halo-clr);

  position: absolute;
  transform: translateX(var(--sun-offset)) translateY(var(--sun-offset));
  transition: transform var(--transition-standard);
}

html.dark .toggle__container .toggle__sun {
  transform: translateX(
      calc(var(--toggle-width) - var(--sun-diameter) - var(--sun-offset))
    )
    translateY(var(--sun-offset));
}

.toggle__moon-mask {
  background-color: var(--moon-clr);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translateX(100%);
  transition: transform var(--transition-standard);

  box-shadow:
    0.06em 0.06em 0.06em 0em rgba(254, 255, 239, 0.61) inset,
    0em -0.06em 0.06em 0em #969696 inset;
}

html.dark .toggle__container .toggle__moon-mask {
  transform: translateX(0);
}

.toggle__crater {
  position: absolute;
  background-color: var(--crater-clr);
  border-radius: 50%;
  box-shadow: 0.03em 0.03em 0.06em var(--shadow-primary) inset;
}

.toggle__crater:nth-of-type(1) {
  top: 0.75em;
  left: 0.3em;
  width: 0.75em;
  height: 0.75em;
}
.toggle__crater:nth-of-type(2) {
  top: 0.8em;
  left: 1.35em;
  width: 0.375em;
  height: 0.375em;
}
.toggle__crater:nth-of-type(3) {
  top: 0.3em;
  left: 0.7em;
  width: 0.25em;
  height: 0.25em;
}

.toggle__clouds {
  width: 1.25em;
  height: 1.25em;
  border-radius: 50%;
  background-color: var(--cloud-clr-front);

  position: absolute;
  left: 0.3em;
  top: 2em;

  box-shadow:
    0.75em -0.2em var(--cloud-clr-front),
    3em 0.1em var(--cloud-clr-front),
    3.5em 0em var(--cloud-clr-front),
    4em 0.1em var(--cloud-clr-front);

  transition: transform var(--transition-standard);
}

html.dark .toggle__container .toggle__clouds {
  transform: translateY(3em);
}

.toggle__stars > svg {
  fill: var(--star-clr);
  width: 0.15em;
  position: absolute;

  transform: translateY(-3em);
  transition: transform var(--transition-standard);
}

.toggle__stars > svg:nth-of-type(1) {
  top: 0.4em;
  left: 0.4em;
}
.toggle__stars > svg:nth-of-type(2) {
  top: 0.6em;
  left: 2em;
}
.toggle__stars > svg:nth-of-type(3) {
  top: 1em;
  left: 1em;
}

html.dark .toggle__container .toggle__stars > svg {
  transform: translateY(0.5em);
}

.toggle__container:hover .toggle__sun {
  transform: translateX(0.25em) translateY(var(--sun-offset));
}
</style>
