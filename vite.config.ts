import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { cloudflare } from "@cloudflare/vite-plugin";
import Markdown from "unplugin-vue-markdown/vite";
import seoPrerender from "vite-plugin-seo-prerender";

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),

    vueDevTools(),

    cloudflare(),

    Markdown({
      include: [/\.md$/],
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
    }),

    seoPrerender({
      routes: ["/"],
    }),
  ],

  test: {
    globals: true,
    environment: "happy-dom",
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
