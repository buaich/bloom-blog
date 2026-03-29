import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import seoPrerender from "vite-plugin-seo-prerender";

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    seoPrerender({
      routes: ["/"],
    }),
  ],

  test: {
    globals: true,
    environment: "happy-dom", // 你之前有这一项，建议保留
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
