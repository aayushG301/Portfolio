import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Kept deliberately thin. Nothing here should be required to understand the app,
// so that swapping Vite for Next.js later is a config change, not a rewrite.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
