const globals = require("globals");
const eslint = require("@eslint/js");
const eslintPluginLit = require("eslint-plugin-lit");
const eslintConfigPrettier = require("eslint-config-prettier");
const tseslint = require("typescript-eslint");
require("eslint-plugin-only-warn");
const react = require("eslint-plugin-react");

module.exports = tseslint.config(
  // register all of the plugins up-front
  {
    // note - intentionally uses computed syntax to make it easy to sort the keys
    plugins: {
      ["@typescript-eslint"]: tseslint.plugin,
    },
  },
  // config with just ignores is the replacement for `.eslintignore`
  {
    ignores: [
      "eslint.config.js",
      ".nx/**",
      "angular-workspace/.angular/**",
      "angular-workspace/.angular/*.ts",
      "angular-workspace/dist/**",
      "angular-workspace/projects/component-library/src/lib/stencil-generated/**",
      "angular-workspace/www/**",
      "packages/*/dist/**",
      "packages/*/www/**",
      "packages/core/loader/**",
      "packages/core/src/components.d.ts",
      "packages/react/src/components.ts",
      "packages/react/src/react-component-lib/**",
      "storybook/www/**",
      "website/.docusaurus/**",
      "website/docusaurus.config.js",
      "website/www/**",
      "**/.storybook/**",
    ],
  },
  // extends
  {
    rules: {
      ...eslint.configs.recommended.rules,
      "no-duplicate-imports": "error",
    },
  },
  ...tseslint.configs.recommended,
  {
    // eslint-plugin-lit
    ...eslintPluginLit.configs["flat/recommended"],
    rules: {
      "lit/no-invalid-escape-sequences": "error",
      "lit/no-property-change-update": "error",
      "lit/no-template-bind": "error",
      "lit/no-useless-template-literals": "error",
      "lit/quoted-expressions": "error",
    },
  },
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    rules: {
      eqeqeq: "error",
      "no-console": [
        "error",
        {
          allow: ["assert", "debug", "error", "group", "info", "table", "trace", "warn"],
        },
      ],
      "no-else-return": ["error", { allowElseIf: false }],
      "object-shorthand": ["error"],
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: false,
          varsIgnorePattern: "^(_|h$|Fragment$)",
          argsIgnorePattern: "^_",
        },
      ],
      "no-duplicate-imports": "error",
    },
  },
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["packages/core/src/**/*{.ts,.tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        project: "./packages/core/tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // @stencil-community overrides
      "func-style": [2, "declaration", { allowArrowFunctions: true }],
      "no-shadow": 0,
      "react/jsx-no-bind": 0,
      "@typescript-eslint/no-shadow": 2,
      "@stencil-community/strict-boolean-conditions": 0,
      /*"@stencil-community/decorators-style": [
        "error",
        {
          prop: "multiline",
          state: "multiline",
          element: "multiline",
          event: "multiline",
          method: "multiline",
          watch: "multiline",
          listen: "multiline",
        },
      ],*/
    },
  },
);
