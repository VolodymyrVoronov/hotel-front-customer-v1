import { defineConfig } from "vite";
import million from "million/compiler";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { optimizeCssModules } from "vite-plugin-optimize-css-modules";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ mode: "react" }),
    react(),
    ViteImageOptimizer(),
    optimizeCssModules(),
  ],
});

