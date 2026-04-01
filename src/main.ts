import "./assets/styles/layout.css";
import "./assets/styles/md.css";
import { createApp } from "vue";
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 引入Pinia创建器
import { createPinia } from "pinia";
// 引入mitt
import emitter from "./utils/emitter";
// 引入MarkdownWrapper全局组件
import MarkdownWrapper from "./components/tools/MarkdownWrapper.vue";

const pinia = createPinia();

createApp(App)
  .component("MarkdownWrapper", MarkdownWrapper)
  .use(pinia)
  .use(router)
  .mount("#app");
