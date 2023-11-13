module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "space-before-function-paren": "off",
    "comma-dangle": "off",
    "multiline-ternary": "off",
    "one-var": "off",
    "no-const-assign": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    newIsCap: "off",
    "no-sequences": "off",
    "no-unused-vars": "warn",
    "no-undef": "off",
    "no-use-before-define": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
};
