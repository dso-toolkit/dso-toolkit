module.exports = {
  extends: ["@infoprojects/stylelint-config-scss", "stylelint-config-prettier-scss"],
  overrides: [
    {
      extends: ["@infoprojects/stylelint-config-scss", "stylelint-config-prettier-scss"],
      files: ["packages/dso-toolkit/src/icons/**.scss"],
      rules: {
        "selector-pseudo-class-no-unknown": null,
        "selector-type-no-unknown": null,
      },
    },
  ],
  rules: {
    "declaration-property-value-disallowed-list": {
      "text-overflow": ["ellipsis"],
      "white-space": ["nowrap"],
    },
  },
};
