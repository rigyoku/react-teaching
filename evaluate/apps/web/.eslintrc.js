/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["plugin:react-hooks/recommended"],
  plugins: ["react-hooks"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
