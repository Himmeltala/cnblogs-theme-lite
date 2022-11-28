import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
        // 入口文件名
        entryFileNames: "[name].js",
        // 块文件名
        chunkFileNames: "[name].js",
        // 资源文件名 css 图片等等
        assetFileNames: "[name].[ext]"
      }
    }
  }
});
