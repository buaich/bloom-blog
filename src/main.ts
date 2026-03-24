import "./assets/styles/layout.css";
import { createApp } from "vue";
import App from "./App.vue";
// 引入路由器
import router from "./router";
// 引入Pinia创建器
import { createPinia } from "pinia";
// 引入mitt
import emitter from "./utils/emitter";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
