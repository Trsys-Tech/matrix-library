// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  { ignores: ["dist/**", "storybook-static/**", "coverage/**", "node_modules/**", "vitest.shims.d.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Library modules intentionally export component helpers; Fast Refresh is a
      // development-server constraint, not a requirement of the published API.
      camelcase: "error",
      "spaced-comment": "error",
      quotes: ["error", "double", { avoidEscape: true }],
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "always",
          allowObjectTypes: "always",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["*.{js,mjs,cjs,ts}", ".storybook/**/*.{js,ts}", ".husky/**/*.mjs", "tests/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.node },
  },
  storybook.configs["flat/recommended"],
);
