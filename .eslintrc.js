module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": ["off"],
      },
    },
    {
      files: ["packages/core/src/**/*{.ts,.tsx}"],
      parserOptions: {
        project: "./packages/core/tsconfig.json",
      },
      extends: ["@infoprojects/eslint-config", "plugin:@stencil-community/strict", "prettier"],
      rules: {
        // base config?
        "func-style": [2, "declaration", { allowArrowFunctions: true }],
        // @stencil-community overrides
        "react/jsx-no-bind": 0,
        "no-shadow": 0,
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
  ],
  plugins: ["@typescript-eslint", "only-warn", "lit"],
  extends: ["@infoprojects/eslint-config", "prettier"],
  rules: {
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
    "no-duplicate-imports": "error",
  },
};
