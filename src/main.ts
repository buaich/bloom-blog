import { createApp } from "vue";
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 引入 Markdown 样式和代码高亮主题
import "./assets/styles/markdown-theme.css";
import "./assets/styles/highlight-theme.css";
// 引入高亮自定义指令
import vMarkdown from "./directives/markdown";
// 引入Pinia创建器
import { createPinia } from "pinia";
// 使用mitt
import emitter from "./utils/emitter";
// 引入 Fira Sans 字重
import "@fontsource/fira-sans/300.css";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/700.css";

// 引入 Fira Code
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";

const pinia = createPinia();

createApp(App)
  .directive("markdown", vMarkdown)
  .use(pinia)
  .use(router)
  .mount("#app");
