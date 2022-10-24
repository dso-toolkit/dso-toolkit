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
  plugins: ["@typescript-eslint", "only-warn"],
  extends: ["@infoprojects/eslint-config", "plugin:lit/recommended", "prettier"],
};
