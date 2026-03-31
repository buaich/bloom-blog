<script setup lang="ts" name="NavContent">
import { useNavStore } from "@/store/nav";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ state?: string }>();
const state = ref<string>(props.state || "big");
const store = useNavStore();
const { menuOptions } = store;
const activeDropdownKey = ref<string | null>(null); //当前展开的菜单项的key

const toggleDropdown = (key: string) => {
  activeDropdownKey.value = activeDropdownKey.value === key ? null : key;
};

const emit = defineEmits<{
  (e: "c", item: string): void;
}>();
const router = useRouter();

const go = (path: string) => {
  if (state.value === "big") {
    router.push(path);
  } else if (state.value === "small") {
    emit("c", path);
    router.push(path);
  }
};
</script>

<template>
  <div :class="`${state}-content`">
    <div
      :class="`${state}-option`"
      v-for="menuOption in menuOptions"
      :key="menuOption.key"
    >
      <button :class="`${state}-btn`">
        <svg
          t="1774526541289"
          class="big-btn-logo"
          v-if="state === 'big'"
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
        <svg
          @click="toggleDropdown(menuOption.key)"
          t="1774958873539"
          class="small-btn-logo"
          v-if="state === 'small'"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6433"
        >
          <path
            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0zM512 972.8C256 972.8 51.2 768 51.2 512S256 51.2 512 51.2 972.8 256 972.8 512 768 972.8 512 972.8z"
            fill="#8C8C8C"
            p-id="6434"
          ></path>
          <path
            d="M774.4 486.4 537.6 486.4 537.6 249.6c0-12.8-12.8-25.6-25.6-25.6S486.4 236.8 486.4 249.6l0 236.8L249.6 486.4C236.8 486.4 224 499.2 224 512c0 12.8 12.8 25.6 25.6 25.6l236.8 0 0 236.8c0 12.8 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6L537.6 537.6l236.8 0c12.8 0 25.6-12.8 25.6-25.6C800 499.2 787.2 486.4 774.4 486.4z"
            p-id="6435"
          ></path>
        </svg>
        <span :class="`${state}-btn-text`">
          {{ menuOption.key }}
        </span>
      </button>

      <!-- big模式：下拉框总是渲染，由CSS悬停控制显示 -->
      <div v-if="state === 'big'" :class="`big-dropdown`">
        <a
          :class="`big-dropdown-item`"
          v-for="item in menuOption.value"
          :key="item"
          @click="go(`/${menuOption.key}/${item}`)"
        >
          {{ item }}
        </a>
      </div>

      <!-- small模式：下拉框由 activeDropdownKey 控制渲染 -->
      <div
        v-if="state === 'small' && activeDropdownKey === menuOption.key"
        :class="`small-dropdown`"
      >
        <a
          :class="`small-dropdown-item`"
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
.big-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.big-option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 var(--font-size);
}
.big-btn {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--font-clr-one);
  transition: all var(--transtion-standard);
}
.big-btn-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--menu-h);
  line-height: var(--menu-h);
}
.big-btn-logo {
  fill: var(--font-clr-one);
  margin-left: calc(var(--font-size) / 4);
  transition: var(--transtion-standard);
}
.big-dropdown {
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
.big-dropdown-item {
  color: var(--font-clr-one);
  text-decoration: none;
  cursor: pointer;
}
.big-option:hover .big-dropdown {
  display: flex;
}
.big-btn:hover {
  color: var(--font-clr-two);
}
.big-btn:hover .big-btn-logo {
  fill: var(--font-clr-two);
}
@media (max-width: 960px) {
  .big-option {
    display: none;
  }
}

.small-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--font-size) var(--font-size);
}
.small-option {
  position: relative;
  box-sizing: border-box;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: calc(var(--font-size) / 2);
  background-color: var(--bg-clr);
  transition: all var(--transtion-standard);
}
.small-btn {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  border: none;
  background-color: var(--bg-clr);
  color: var(--font-clr-one);
  padding: calc(var(--font-size) / 2);
  border-bottom: 1px solid var(--font-clr-two);
}
.small-btn-logo {
  fill: var(--font-clr-one);
  width: calc(var(--font-size) * 1.2);
  height: calc(var(--font-size) * 1.2);
  transition: var(--transtion-standard);
  cursor: pointer;
}
.small-dropdown {
  display: flex;
  flex-direction: column;
  color: var(--font-clr-one);
  padding: calc(var(--font-size) / 2) calc(var(--font-size) * 1.2);
}
.small-dropdown-item {
  color: var(--font-clr-one);
  text-decoration: none;
  cursor: pointer;
}
</style>
