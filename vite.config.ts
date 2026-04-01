import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { cloudflare } from "@cloudflare/vite-plugin";
import Markdown from "unplugin-vue-markdown/vite";
import hljs from "highlight.js";

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),

    vueDevTools(),

    cloudflare(),

    Markdown({
      wrapperComponent: "MarkdownWrapper",
      markdownItSetup(md) {
        md.options.highlight = (code, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
              console.error(err);
            }
          }
          return hljs.highlightAuto(code).value;
        };
      },
      include: [/\.md$/],
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
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
