module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react-perf', 'relay', '@typescript-eslint', 'import'],
  extends: [
    'airbnb-typescript/base',
    'next/core-web-vitals',
    "prettier"
  ],
  
};
