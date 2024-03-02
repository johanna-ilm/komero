module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
    // 'prettier'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
    'jest',
    'simple-import-sort'
  ],
  rules: {
    'no-unused-vars': 'warn',
    'object-curly-spacing': ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'keyword-spacing': ['error', { overrides: { if: { after: false }, for: { after: false }, while: { after: false }, static: { after: false }, as: { after: false } } }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-console': 'warn',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  ignorePatterns: [
    'node_modules',
    'build',
    'dist',
    'public'
  ]
}
