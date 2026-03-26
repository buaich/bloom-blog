import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./auth.ts";
import docsRoutes from "./doc.ts";
import personRoutes from "./person.ts";

// 创建路由器
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/home", alias: "/house", redirect: "/" },
    ...authRoutes,
    ...docsRoutes,
    ...personRoutes,
  ],
});

// 导出路由器
export default router;
