import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];