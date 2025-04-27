import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/cinema-guide-api/", 
  build: {
    target: "esnext",
  },
});
