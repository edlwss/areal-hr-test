import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      vue: pluginVue,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    processor: pluginVue.processors['.vue'],
  },
];
