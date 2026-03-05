import NoteSearchBar from "@/pages/frontend-pages/NoteSearchBar.vue";
import NoteShowBox from "@/pages/frontend-pages/NoteShowBox.vue";
import Login from "@/pages/login-register-page/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    alias: "/house",
    redirect: "/",
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    path: "/docs",
    children: [
      {
        path: ":name(vue|es6|webpack|)", // 正则表达式
        meta: { hideDefault: true },
        components: {
          "note-show-box": NoteShowBox,
          "note-search-bar": NoteSearchBar,
        },
      },
    ],
  },
];

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由器
export default router;
