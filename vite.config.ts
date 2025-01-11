import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, basename } from "path";

import { dependencies, peerDependencies } from "./package.json";

function getComponentName(entryName: string): string {
  const name = basename(entryName);
  return name.replace(/\..+$/, "").toLowerCase();
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ["src"],
      exclude: ["src/**/*.stories.ts", "src/**/*.stories.tsx"],
      staticImport: true,
    }),
    react({
      jsxRuntime: "automatic",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src", "index.ts"),
      formats: ["es"],
      fileName: (ext, entry) => {
        const componentName = getComponentName(entry);
        return `${componentName}.${ext}.js`;
      },
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies), ...Object.keys(dependencies), "react/jsx-runtime"],
      output: { preserveModules: true, exports: "named" },
    },
    target: "esnext",
    sourcemap: true,
  },
});
