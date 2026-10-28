import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    passWithNoTests: true,
    projects: [
      "./vitest.unit.config.ts",
      {
        optimizeDeps: { include: ["react/jsx-dev-runtime"] },
        test: {
          name: "storybook-browser",
          include: ["tests/browser/**/*.test.tsx"],
          setupFiles: ["./.storybook/vitest.setup.ts"],
          browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: "chromium" }] },
        },
      },
      {
        optimizeDeps: { include: ["react/jsx-dev-runtime"] },
        plugins: [storybookTest({ configDir: fileURLToPath(new URL(".storybook", import.meta.url)) })],
        test: {
          name: "storybook",
          setupFiles: ["./.storybook/vitest.setup.ts"],
          browser: { enabled: true, headless: true, provider: playwright(), instances: [{ browser: "chromium" }] },
        },
      },
    ],
  },
});
