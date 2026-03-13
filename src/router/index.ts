import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth";

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/home", alias: "/house", redirect: "/" }, ...authRoutes],
});

// 导出路由器
export default router;
