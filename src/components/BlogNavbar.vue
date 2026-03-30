<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from "vue";
import ThemeButton from "./ThemeButton.vue";
import { useRouter } from "vue-router";

const menuOptions = ref<Map<string, string[]>>(
  new Map([
    ["Docs", ["JavaScript", "Axios", "TypeScript"]],
    ["UI", ["Form", "Button", "Block"]],
    ["About", ["Me", "Github"]],
  ]),
); //菜单选项为下拉框
const computedMenuOptions = computed(() =>
  [...menuOptions.value.entries()].map(([key, value]) => ({ key, value })),
);

const router = useRouter();
function go(path: string) {
  router.push(path);
}

const keys = useTemplateRef<HTMLSpanElement>("keys"); //DOM元素
/**
 * @description 搜索聚焦
 * @param {Event} event - 当前事件对象
 * @returns {undefined}
 */
function focusSearchKeys(event: KeyboardEvent) {
  // 阻止默认行为
  if ((event.ctrlKey || event.metaKey) && event.key === "f") {
    event.preventDefault();
    keys.value?.focus();
  }
}
onMounted(() => window.addEventListener("keydown", focusSearchKeys));
onUnmounted(() => window.removeEventListener("keydown", focusSearchKeys));
</script>

<template>
  <header class="navbar">
    <!-- 网站标识 -->
    <a class="site-title" href="/">
      <svg
        t="1772689824065"
        class="site-title-logo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3094"
        width="24"
        height="24"
      >
        <path
          d="M705.5 136.5h-391c-108 0-195.5 87.5-195.5 195.3v293.9c1.5 69 42 113.6 85.5 161.2l80.3 80.3c11.6 8.9 19 12 29.7 11.8 10.7 0.3 21.5-3.6 29.7-11.8l46.2-46.2h315.1c108 0 195.5-87.5 195.5-195.3V331.8c0-107.8-87.5-195.3-195.5-195.3z m-20.6 360.6c-1.5 7.7-5.2 15.1-11.1 21L520.2 671.7c-15.8 15.8-41.5 15.8-57.3 0-15.8-15.8-15.8-41.5 0-57.3l87-87H353.6c-19.2 0-35.1-13.9-38.4-32.1-2.9-13 0.7-27.2 10.8-37.3l153.6-153.6c15.8-15.8 41.5-15.8 57.3 0 15.8 15.8 15.8 41.4 0 57.3l-87.6 87.6h192.5c4-0.3 8.1-0.2 12 0.7 18.2 3.3 32.1 19.2 32.1 38.4 0.1 3-0.4 5.9-1 8.7z"
          p-id="3095"
        ></path>
      </svg>
      <span class="site-title-text">Bloom</span>
    </a>

    <div class="navbar-content">
      <!-- 导航栏搜索框 -->
      <div class="docsearch">
        <button class="docsearch-button" type="button">
          <span class="docsearch-button-title"
            ><svg
              t="1774508615134"
              class="docsearch-button-logo"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2594"
              width="20"
              height="20"
            >
              <path
                d="M961.595655 897.17409l-181.388844-177.951232a428.604285 428.604285 0 0 0-22.454184-592.000526 450.546484 450.546484 0 0 0-627.546887 0 428.604285 428.604285 0 0 0 0 615.405538 451.497312 451.497312 0 0 0 581.760832 37.52116l183.290502 179.926031a48.784822 48.784822 0 0 0 31.231063 15.140117c12.287631 0 24.136419-4.754143 33.13272-13.165319a45.859196 45.859196 0 0 0 1.974798-64.875769zM93.635408 434.925101A347.198727 347.198727 0 0 1 444.271746 93.650768a347.198727 347.198727 0 0 1 350.051213 341.347473 347.198727 347.198727 0 0 1-350.051213 341.347474A347.198727 347.198727 0 0 1 93.635408 434.925101z"
                p-id="2595"
              ></path>
            </svg>
            <span class="dosearch-button-text">search</span></span
          >
          <span tabindex="0" class="docsearch-button-keys" ref="keys">
            <kbd class="docsearch-button-key">Ctrl</kbd>
            <kbd class="docsearch-button-key">F</kbd>
          </span>
        </button>
      </div>
      <!-- 导航栏菜单 -->
      <div class="dropdown">
        <div
          class="dropdown-option"
          v-for="menuOption in computedMenuOptions"
          :key="menuOption.key"
        >
          <button class="dropdown-btn">
            <span class="dropdown-btn-text">
              {{ menuOption.key }}
              <svg
                t="1774526541289"
                class="dropdown-btn-logo"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4750"
                width="16"
                height="16"
              >
                <path
                  d="M512.059 797.675c-21.015 0-42.029-8.021-58.071-24.063L88.075 407.779c-32.084-32.043-32.084-84.059 0-116.142s84.059-32.084 116.142 0l307.842 307.762 307.922-307.762c32.084-32.084 84.059-32.084 116.143 0s32.084 84.099 0 116.142L570.131 773.612c-16.042 16.042-37.057 24.063-58.072 24.063z"
                  p-id="4751"
                ></path>
              </svg>
            </span>
          </button>

          <div class="dropdown-list">
            <a
              class="dropdown-list-item"
              v-for="item in menuOption.value"
              :key="item"
              @click="go(`/${menuOption.key}/${item}`)"
            >
              {{ item }}
            </a>
          </div>
        </div>
      </div>

      <div class="hamburger">
        <button class="hamburger-btn">
          <svg
            t="1774573589496"
            class="hamburger-btn-logo"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7980"
          >
            <path
              d="M170.624 256c0-23.616 19.136-42.688 42.688-42.688h597.312a42.688 42.688 0 1 1 0 85.312H213.312A42.688 42.688 0 0 1 170.624 256z m0 256c0-23.552 19.072-42.688 42.688-42.688h597.312a42.688 42.688 0 1 1 0 85.376H213.312A42.688 42.688 0 0 1 170.624 512z m42.688 213.312a42.688 42.688 0 0 0 0 85.376h597.312a42.688 42.688 0 0 0 0-85.376H213.312z"
              p-id="7981"
            ></path>
          </svg>
        </button>
      </div>

      <div class="theme">
        <ThemeButton :size="10" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  --menu-h: 55px;
  --menu-w: 100%;
  --menu-padding: 0em 2em;
}
.navbar {
  position: relative;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: var(--menu-h);
  width: var(--menu-w);
  padding: var(--menu-padding);
  border-bottom: 1px solid var(--border-clr);
  background-color: var(--bg-clr);

  font-size: var(--font-size);
  font-weight: var(--font-weight);
  letter-spacing: normal;
  color: var(--font-clr-one);
  transition: all var(--transtion-standard);
}
@media (min-width: 750px) {
  .navbar {
    position: fixed;
  }
}
.site-title {
  height: var(--menu-h);
  display: flex;
  align-items: center;
  cursor: pointer;

  text-decoration: none;
  color: inherit;
}
.site-title-logo {
  fill: var(--font-clr-one);
  transition: fill var(--transtion-standard);
}
.site-title-text {
  height: calc(var(--font-size) * 1.5);
  line-height: calc(var(--font-size) * 1.5);
  font-size: calc(var(--font-size) * 1.2);
}
.navbar-content {
  flex-grow: 1; /* 填充剩余空间 */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: var(--font-size);
}

.docsearch {
  flex-grow: 1;
  flex-shrink: 2;
  display: flex;
  align-items: center;
  height: var(--menu-h);
}
.docsearch-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  padding: 0 calc(var(--font-size) / 2);
  cursor: pointer;
  color: var(--font-clr-two);
}
.docsearch-button-title {
  display: flex;
  align-items: center;
  padding: 0 calc(var(--font-size) / 2) 0 0;
}
.docsearch-button-logo {
  fill: var(--font-clr-two);
  margin-right: calc(var(--font-size) / 2);
  transition: fill var(--transtion-standard);
}
.docsearch-button-keys {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 calc(var(--font-size) / 2);
  border: 1px solid var(--font-clr-two);
  border-radius: 4px;
  color: var(--font-clr-two);

  transition: all var(--transtion-standard);
}
.docsearch-button-key {
  height: calc(var(--font-size) * 1.5);
  line-height: calc(var(--font-size) * 1.5);
  padding: 0 calc(var(--font-size) / 4) 0 0;
}
.docsearch:hover .docsearch-button-logo {
  fill: var(--font-clr-two);
}
.docsearch:hover .docsearch-button-keys {
  border-color: var(--font-clr-one);
  color: var(--font-clr-one);
}
.docsearch-button-keys:focus,
.docsearch-button-keys:focus-visible {
  color: var(--font-clr-one);
  border: 1px solid var(--font-clr-one);
}
.dropdown {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.dropdown-option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 var(--font-size);
}
.dropdown-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--font-clr-one);
  transition: all var(--transtion-standard);
}
.dropdown-btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--menu-h);
  line-height: var(--menu-h);
}
.dropdown-btn-logo {
  fill: var(--font-clr-one);
  margin-left: calc(var(--font-size) / 4);
  transition: var(--transtion-standard);
}
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;

  display: none;
  flex-direction: column;

  background-color: var(--bg-clr);
  padding: calc(var(--font-size) / 4) calc(var(--font-size));
  border: 1px solid var(--border-clr);
  border-radius: var(--border-rs);
  transition: all var(--transtion-standard);
}
.dropdown-list-item {
  color: var(--font-clr-one);
  text-decoration: none;
}

.dropdown-option:hover .dropdown-list {
  display: flex;
}
.dropdown-btn:hover {
  color: var(--font-clr-two);
}
.dropdown-btn:hover .dropdown-btn-logo {
  fill: var(--font-clr-two);
}

.hamburger-btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0 var(--font-size);
}
.hamburger-btn-logo {
  fill: var(--font-clr-one);
  width: calc(var(--font-size) * 1.5);
  height: calc(var(--font-size) * 1.5);
}

@media (max-width: 800px) {
  .dosearch-button-text {
    display: none;
  }

  .dropdown-option {
    display: none;
  }
}

.theme {
  display: flex;
  align-items: center;
}
</style>
