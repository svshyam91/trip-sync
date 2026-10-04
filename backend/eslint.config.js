import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { importX } from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist/', 'coverage/'],
  },

  {
    files: ['**/*.ts'],

    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      'import-x': importX,
    },

    rules: {
      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // Imports
      'import-x/no-duplicates': 'error',

      'import-x/no-self-import': 'error',

      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],

          pathGroups: [
            {
              pattern: '#*/**',
              group: 'internal',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import-x/no-cycle': 'error',

      // General
      eqeqeq: ['error', 'always', { null: 'ignore' }],

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      // Maintainability
      complexity: ['warn', { max: 15 }],
      'max-depth': ['warn', { max: 4 }],
      'max-params': ['warn', { max: 4 }],
      'no-nested-ternary': 'warn',

      // Readability
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['if', 'for', 'while', 'switch', 'try'],
        },
        {
          blankLine: 'always',
          prev: ['if', 'for', 'while', 'switch', 'try'],
          next: '*',
        },
      ],
    },
  },

  prettier,

  // Must come after `prettier`, which turns `curly` off
  {
    files: ['**/*.ts'],
    rules: {
      curly: ['error', 'all'],
    },
  },
);
