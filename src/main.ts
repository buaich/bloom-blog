import { createApp } from "vue";
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 引入Pinia创建器
import { createPinia } from "pinia";
// 引入mitt
import emitter from "./utils/emitter";
// 引入自定义指令
import mdDirective from "@/utils/directives/md";

const pinia = createPinia();

createApp(App)
  .directive("md", mdDirective)
  .use(pinia)
  .use(router)
  .mount("#app");
