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
  },
};
