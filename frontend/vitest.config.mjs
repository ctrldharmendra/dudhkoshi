import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // mirrors the "@/*": ["./src/*"] mapping in jsconfig.json
      "@": path.resolve(dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.js"],
    include: ["src/**/*.test.{js,jsx}"],
    // Next compiles `<style jsx global>` with styled-jsx; Vitest does not, so
    // React warns about literal `jsx` / `global` attributes. Not our concern here.
    onConsoleLog(log) {
      if (log.includes("non-boolean attribute")) return false;
    },
  },
});
