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
import { rules, theme, shortcuts } from "./unocss.config";
import transformerDirective from "@unocss/transformer-directives";

export default defineConfig(({ command, mode }) => {
  const { VITE_BLOG_APP } = loadEnv(mode, "./");
  return {
    plugins: [
      vue(),
      Unocss({
        theme,
        rules,
        shortcuts,
        transformers: [
          transformerDirective({
            applyVariable: ["--at-apply", "--uno-apply", "--uno"]
          })
        ],
        presets: [presetAttributify({}), presetUno()]
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
          ElementPlusResolver(),
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
          additionalData: `@use "@/scss/pre/mixins.scss" as *;`
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
