import Login from "@/pages/auth/Login.vue";
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
];

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导出路由器
export default router;
