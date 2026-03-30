import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";

const TAILWIND_VAR_PREFIX = /--tw-/g;

function renameTailwindCssVariables() {
  return {
    postcssPlugin: "rename-tailwind-css-variables",
    OnceExit(root) {
      root.walkDecls((decl) => {
        if (decl.prop.includes("--tw-")) {
          decl.prop = decl.prop.replace(TAILWIND_VAR_PREFIX, "--mtx-");
        }

        if (decl.value.includes("--tw-")) {
          decl.value = decl.value.replace(TAILWIND_VAR_PREFIX, "--mtx-");
        }
      });

      root.walkAtRules((atRule) => {
        if (atRule.params.includes("--tw-")) {
          atRule.params = atRule.params.replace(TAILWIND_VAR_PREFIX, "--mtx-");
        }
      });
    },
  };
}

export default {
  plugins: [tailwindcss(), autoprefixer(), renameTailwindCssVariables()],
};
