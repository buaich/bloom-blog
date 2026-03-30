<script setup lang="ts" name="DocMenu"></script>

<template>
  <div class="menu">
    <button class="menu-btn" type="button">
      <svg
        t="1774868009023"
        class="menu-btn-logo"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2503"
        width="48"
        height="48"
      >
        <path
          d="M886.67 256.13H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.19-4.21 9.41-9.41 9.41zM886.67 545.22H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.2-4.21 9.41-9.41 9.41zM886.67 832.32H137.35c-5.2 0-9.41-4.21-9.41-9.41v-45.18c0-5.2 4.21-9.41 9.41-9.41h749.32c5.2 0 9.41 4.21 9.41 9.41v45.18c0.01 5.2-4.21 9.41-9.41 9.41z"
          p-id="2504"
        ></path>
      </svg>
      <span class="menu-btn-text">content</span>
    </button>
  </div>
</template>

<style scoped>
.menu {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-clr);
  box-sizing: border-box;
  border-bottom: 1px solid var(--border-clr);
}

.menu-btn {
  display: flex;
  align-items: center;
  border: none;
  padding: 0 calc(var(--font-size) * 2);
  cursor: pointer;
  background-color: transparent;
  color: var(--font-clr-one);
}

.menu-btn-logo {
  fill: var(--font-clr-one);
  width: var(--font-size);
  height: var(--font-size);
  margin-right: calc(var(--font-size) / 2);
}
</style>
