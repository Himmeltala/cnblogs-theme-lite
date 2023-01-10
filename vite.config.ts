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
import { resolve } from "path";

export default defineConfig(({ command, mode }) => {
  const { VITE_BLOG_APP } = loadEnv(mode, "./");
  return {
    envDir: "./",
    plugins: [
      vue(),
      Unocss({
        presets: [presetAttributify({}), presetUno()],
        rules: [
          [/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "font-size": `${d}px` })],
          [/^lts-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "letter-spacing": `${d}px` })],
          [/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "line-height": `${d}` })],
          [/^wpe-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ width: `${d}%` })],
          [/^brd-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ "border-radius": `${d}px` })],
          [/^hrm-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}rem` })],
          [/^hpx-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ height: `${d}px` })]
        ]
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
          additionalData: `@import "@/scss/mixins.scss"; @import "@/scss/common.scss";`
        }
      }
    },
    base: "/",
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
