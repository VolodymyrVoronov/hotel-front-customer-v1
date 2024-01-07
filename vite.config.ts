import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { optimizeCssModules } from "vite-plugin-optimize-css-modules";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteImageOptimizer(), optimizeCssModules()],
});

