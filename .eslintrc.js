module.exports = {
  env: {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "jquery": true
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
  },
  extends: "eslint:recommended",
  rules: {
    indent: [
      "error",
      2
    ],
    quotes: [
      "error",
      "single"
    ],
    semi: [
      "error",
      "always"
    ],
    "no-extra-parens": [
      "error",
      "all"
    ],
    "for-direction": [
      "error"
    ],
    "getter-return": [
      "error"
    ],
    "no-await-in-loop": [
      "error"
    ],
    "no-prototype-builtins": [
      "error"
    ],
    "no-template-curly-in-string": [
      "error"
    ],
    "accessor-pairs": [
      "error"
    ],
    "array-callback-return": [
      "error"
    ],
    "block-scoped-var": [
      "error"
    ],
    "class-methods-use-this": [
      "error"
    ],
    "complexity": [
      "warn"
    ],
    "consistent-return": [
      "warn"
    ],
    "curly": [
      "error"
    ],
    "default-case": [
      "warn"
    ],
    "dot-location": [
      "error",
      "property"
    ],
    "dot-notation": [
      "error"
    ],
    "eqeqeq": [
      "error"
    ],
    "no-alert": [
      "warn"
    ],
    "no-caller": [
      "error"
    ],
    "no-case-declarations": [
      "warn"
    ],
    "no-div-regex": [
      "warn"
    ],
    "no-else-return": [
      "error"
    ],
    "no-empty-function": [
      "error"
    ],
    "no-eval": [
      "error"
    ],
    "no-extend-native": [
      "warn"
    ],
    "no-extra-bind": [
      "error"
    ],
    "no-extra-label": [
      "error"
    ],
    "no-implicit-globals": [
      "error"
    ],
    "no-implied-eval": [
      "error"
    ],
    "no-iterator": [
      "error"
    ],
    "no-loop-func": [
      "error"
    ],
    "no-magic-numbers": [
      "warn",
      {
        ignore: [-1, 0, 1, 2, 100, 65536],
        ignoreArrayIndexes: true
      }
    ],
    "no-multi-spaces": [
      "error"
    ],
    "no-multi-str": [
      "error"
    ],
    "no-new": [
      "error"
    ],
    "no-new-func": [
      "error"
    ],
    "no-new-wrappers": [
      "error"
    ],
    "no-param-reassign": [
      "error"
    ],
    "no-proto": [
      "error"
    ],
    "no-return-assign": [
      "error"
    ],
    "no-return-await": [
      "error"
    ],
    "no-script-url": [
      "error"
    ],
    "no-self-compare": [
      "error"
    ],
    "no-sequences": [
      "error"
    ],
    "no-throw-literal": [
      "error"
    ],
    "no-useless-call": [
      "error"
    ],
    "no-useless-concat": [
      "error"
    ],
    "no-with": [
      "error"
    ],
    "prefer-promise-reject-errors": [
      "error"
    ],
    "radix": [
      "error"
    ],
    "yoda": [
      "error"
    ],
    "strict": [
      "error"
    ],
    "array-bracket-spacing": [
      "error"
    ],
    "block-spacing": [
      "error"
    ],
    "brace-style": [
      "error",
      "stroustrup"
    ],
    "camelcase": [
      "error"
    ],
    "comma-dangle": [
      "error"
    ],
    "comma-spacing": [
      "error"
    ],
    "comma-style": [
      "error"
    ],
    "computed-property-spacing": [
      "error"
    ],
    "eol-last": [
      "error"
    ],
    "func-call-spacing": [
      "error"
    ],
    "function-paren-newline": [
      "error"
    ],
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "key-spacing": [
      "error"
    ],
    "keyword-spacing": [
      "error"
    ],
    "lines-around-comment": [
      "error",
      {
        "beforeBlockComment": true,
        "beforeLineComment": true
      }
    ],
    "multiline-ternary": [
      "error",
      "always-multiline"
    ],
    "new-cap": [
      "error"
    ],
    "new-parens": [
      "error"
    ],
    "no-array-constructor": [
      "error"
    ],
    "no-lonely-if": [
      "error"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1,
        "maxBOF": 0
      }
    ],
    "no-nested-ternary": [
      "error"
    ],
    "no-new-object": [
      "error"
    ],
    "no-tabs": [
      "error"
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "no-unneeded-ternary": [
      "error"
    ],
    "no-whitespace-before-property": [
      "error"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "padded-blocks": [
      "error",
      "never"
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      }
    ],
    "semi": [
      "error"
    ],
    "semi-spacing": [
      "error"
    ],
    "semi-style": [
      "error"
    ],
    "space-before-blocks": [
      "error"
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-in-parens": [
      "error"
    ],
    "space-infix-ops": [
      "error"
    ],
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false
      }
    ],
    "spaced-comment": [
      "error"
    ],
    "switch-colon-spacing": [
      "error"
    ],
    "template-tag-spacing": [
      "error"
    ],
    "unicode-bom": [
      "error"
    ],
    "no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ]
  }
};
