import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@globalTypes": path.resolve(__dirname, "../types"),
      src: path.resolve(__dirname, "src"),
    },
  },
});
