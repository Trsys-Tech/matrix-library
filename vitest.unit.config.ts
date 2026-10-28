import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    environment: "node",
    pool: "forks",
    include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["**/*.stories.*", "**/node_modules/**", "**/dist/**", "tests/browser/**"],
    passWithNoTests: true,
  },
});
