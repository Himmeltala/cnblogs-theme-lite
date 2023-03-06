import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// unocss
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import { rules, shortcuts } from "./unocss.config";
import transformerDirectives from "@unocss/transformer-directives";

export default defineConfig(({ command, mode }) => {
  const { VITE_BLOG_APP } = loadEnv(mode, "./");
  return {
    plugins: [
      vue(),
      Unocss({
        rules,
        shortcuts,
        transformers: [
          transformerDirectives({
            applyVariable: ["--at-apply", "--uno-apply", "--uno"]
          })
        ],
        presets: [presetAttributify({}), presetUno()]
      }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
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
      })
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
          additionalData: `@use "@/scss/mixins.scss" as *; @use "sass:math";`
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
