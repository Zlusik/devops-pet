module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        process: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
