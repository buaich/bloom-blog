<script setup lang="ts">
import ThemeButton from "@/components/nav/ThemeButton.vue";
import HamburgerMenu from "@/components/nav/HamburgerMenu.vue";
import NavSearch from "@/components/nav/NavSearch.vue";
import NavContent from "@/components/nav/NavContent.vue";
import NavMore from "@/components/nav/NavMore.vue";
</script>

<template>
  <header class="navbar">
    <!-- 网站标识 -->
    <a class="navbar-title" href="#">
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

    <div class="navbar-main">
      <!-- 导航栏搜索框 -->
      <div class="search-wrapper navbar-main-item">
        <NavSearch></NavSearch>
      </div>
      <!-- 导航栏菜单 -->
      <div class="content-wrapper navbar-main-item">
        <NavContent :state="'big'"></NavContent>
      </div>

      <div class="more-wrapper navbar-main-item">
        <NavMore></NavMore>
      </div>

      <div class="hamburger-wrapper navbar-main-item">
        <HamburgerMenu />
      </div>

      <div class="theme-wrapper navbar-main-item">
        <ThemeButton :size="10" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  --menu-h: 55px;
  --menu-w: 100%;
  --menu-padding: 0 calc(var(--font-size) * 2);
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
@media (min-width: 960px) {
  .navbar {
    position: fixed;
  }
}
.navbar-title {
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
.navbar-main {
  height: var(--menu-h);
  flex-grow: 1; /* 填充剩余空间 */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: var(--font-size);
}
.navbar-main-item {
  height: var(--menu-h);
  display: flex;
  align-items: center;
}
.search-wrapper {
  flex-grow: 1;
  flex-shrink: 2;
}
.content-wrapper {
  justify-content: flex-end;
}
.hamburger-wrapper {
  display: none;
}

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
  .dropdown-option,
  .more-wrapper {
    display: none;
  }

  .hamburger-wrapper {
    display: flex;
    align-items: center;
  }
}
@media (max-width: 800px) {
  :deep(.option) {
    display: none;
  }
}
</style>
