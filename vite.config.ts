// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";

// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },
// });
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    target: "esnext", // Убедитесь, что target соответствует вашей версии ECMAScript
  },
});
