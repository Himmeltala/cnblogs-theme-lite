import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/cnblogs-theme-lite/dist/",
  server: {
    proxy: {
      "/api": {
        target: "https://www.cnblogs.com/Enziandom",
        changeOrigin: true,
        rewrite: (path: any) => path.replace(/^\/api/, "")
      }
    }
  }
});
