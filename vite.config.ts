import { resolve } from "path";

import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
// plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
// gzip
import viteCompression from "vite-plugin-compression";
// element-plus
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// unocss
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import transformerDirective from "@unocss/transformer-directives";
import { regulation } from "./unocss.regulation";

export default defineConfig(({ command, mode }) => {
  const { VITE_BLOG_APP } = loadEnv(mode, "./");
  return {
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "src")
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/scss/pre/element-plus.scss" as *; @use "@/scss/pre/mixins.scss" as *;`
        }
      }
    },
    server: {
      proxy: {
        "/api": {
          target: `https://www.cnblogs.com/${VITE_BLOG_APP}`,
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
      vue(),
      Unocss({
        transformers: [
          transformerDirective({
            applyVariable: ["--at-apply"]
          })
        ],
        presets: [presetAttributify({}), presetUno()],
        rules: regulation
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon"
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "sass"
          }),
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ],
        dirs: ["./src/views/**", "./src/components/**"]
      }),
      Icons({
        autoInstall: true
      }),
      viteCompression({})
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks() {
            return "components";
          },
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]"
        }
      }
    }
  };
});
