module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['functions/*'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
  },
}
