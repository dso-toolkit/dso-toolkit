// @ts-check

import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import lit from "eslint-plugin-lit";
import onlyWarn from "eslint-plugin-only-warn";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      ".nx",
      "angular-workspace/.angular",
      "angular-workspace/dist",
      "angular-workspace/projects/component-library/src/lib/stencil-generated",
      "angular-workspace/www",
      "packages/*/dist",
      "packages/*/www",
      "packages/core/loader",
      "packages/core/src/components.d.ts",
      "packages/react/src/components.ts",
      "packages/react/src/react-component-lib",
      "storybook/www",
      "website/.docusaurus",
      "website/www",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "only-warn": onlyWarn,
      import: importPlugin,
      lit,
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
    },
    rules: {
      // import-plugin rules
      "import/no-duplicates": "error",
      "import/newline-after-import": "error",
      "import/first": "error",
      "import/no-unresolved": "off",
      "import/named": "off",
      "import/namespace": "off",
      "import/order": [
        "error",
        {
          named: true,
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          pathGroups: [
            {
              pattern: "{@site/**,@theme/**}",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
          },
        },
      ],

      // lit rules
      "lit/attribute-value-entities": "error",
      "lit/binding-positions": "error",
      "lit/no-duplicate-template-bindings": "error",
      "lit/no-invalid-escape-sequences": "error",
      "lit/no-invalid-html": "error",
      "lit/no-legacy-template-syntax": "error",
      "lit/no-private-properties": "error",
      "lit/no-property-change-update": "error",
      "lit/no-template-bind": "error",
      "lit/no-useless-template-literals": "error",
      "lit/quoted-expressions": "error",

      // Common rules
      "no-duplicate-imports": "error",
      eqeqeq: ["error"],
      "no-console": [
        "error",
        {
          allow: ["assert", "debug", "error", "group", "info", "table", "trace", "warn"],
        },
      ],
      "no-else-return": ["error", { allowElseIf: false }],
      "object-shorthand": ["error"],

      // typescript
      "@typescript-eslint/no-empty-object-type": "off",
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
      "@typescript-eslint/no-require-imports": [
        "error",
        {
          allow: [
            "concurrently",
            "@angular-devkit/build-angular/plugins/karma",
            "karma-coverage",
            "karma-jasmine-html-reporter",
            "karma-chrome-launcher",
            "karma-jasmine",
            "path",
            "prism-react-renderer",
          ],
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "it",
          property: "only",
          message: "Do not commit `.only` in tests.",
        },
        {
          object: "describe",
          property: "only",
          message: "Do not commit `.only` in tests.",
        },
      ],
    },
  },
  ...compat
    .extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@stencil-community/strict",
      "prettier",
    )
    .map((config) => ({
      ...config,
      files: ["packages/core/src/**/*{.ts,.tsx}"],
    })),
  {
    files: ["packages/core/src/**/*{.ts,.tsx}"],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",
      parserOptions: {
        project: "./packages/core/tsconfig.json",
      },
    },
    rules: {
      "func-style": [
        2,
        "declaration",
        {
          allowArrowFunctions: true,
        },
      ],
      "no-shadow": 0,
      "react/jsx-no-bind": 0,
      "@typescript-eslint/no-shadow": 2,
      "@stencil-community/strict-boolean-conditions": 0,
      "@stencil-community/decorators-style": [
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
      ],
    },
  },
];
