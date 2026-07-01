import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// base relativo: el build funciona igual en Vercel y bajo subrutas (GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: "./",
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
