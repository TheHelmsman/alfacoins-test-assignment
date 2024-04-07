module.exports = {
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: ['prettier'],
  env: {
    es2021: true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:vue/vue3-essential', '@vue/typescript/recommended'],
  rules: {
    'class-methods-use-this': 0,
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-ignore': 0,
    'ts-ignore': 0,
  },
  ignorePatterns: ['vue.jest.init.js', 'assets/i18n/*.json', 'global.d.ts'],
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
