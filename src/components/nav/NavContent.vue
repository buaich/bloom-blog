<script setup lang="ts" name="NavContent">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const menuOptions = ref<Map<string, string[]>>(
  new Map([
    ["Docs", ["Vue"]],
    ["UI", ["Form", "Button", "Block"]],
    ["About", ["Me", "Github"]],
  ]),
); //菜单选项为下拉框
const computedMenuOptions = computed(() =>
  [...menuOptions.value.entries()].map(([key, value]) => ({ key, value })),
);

const router = useRouter();
/**
 * @description 函数描述
 * @param {类型} 参数名 参数描述
 * @return {返回类型}
 */
function go(path: string) {
  router.push(path);
}
</script>

<template>
  <div class="content">
    <div
      class="option"
      v-for="menuOption in computedMenuOptions"
      :key="menuOption.key"
    >
      <button class="btn">
        <span class="btn-title">
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

      <div class="dropdown">
        <a
          class="dropdown-item"
          v-for="item in menuOption.value"
          :key="item"
          @click="go(`/${menuOption.key}/${item}`)"
        >
          {{ item }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 var(--font-size);
}
.btn {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--font-clr-one);
  transition: all var(--transtion-standard);
}
.btn-title {
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
.dropdown {
  position: absolute;
  top: 100%;
  left: 10%;
  z-index: 999;

  display: none;
  flex-direction: column;

  background-color: var(--bg-clr);
  padding: var(--font-size) var(--font-size);
  border: 1px solid var(--border-clr);
  border-radius: var(--border-rs);
  transition: all var(--transtion-standard);
}
.dropdown-item {
  color: var(--font-clr-one);
  text-decoration: none;
  cursor: pointer;
}
.option:hover .dropdown {
  display: flex;
}
.btn:hover {
  color: var(--font-clr-two);
}
.btn:hover .dropdown-btn-logo {
  fill: var(--font-clr-two);
}

@media (max-width: 800px) {
  .option {
    display: none;
  }
}
</style>
