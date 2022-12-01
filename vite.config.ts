import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ["./src/fragments/**", "./src/components/**"]
    })
  ],
  base: "https://blog-static.cnblogs.com/files/blogs/666252/",
  // base: "/",
  server: {
    proxy: {
      "/api": {
        target: "https://www.cnblogs.com/Enziandom",
        changeOrigin: true,
        rewrite: (path: any) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          return "components";
        },
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
