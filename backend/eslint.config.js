import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import-x';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  {
    ignores: ['dist/', 'coverage/', 'node_modules/'],
  },

  {
    files: ['**/*.ts'],

    extends: [js.configs.recommended, tseslint.configs.recommended],

    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
      },
    },

    plugins: {
      import: importPlugin,
    },

    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',

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
          fixStyle: 'separate-type-imports',
        },
      ],

      // Imports
      'import/no-duplicates': 'error',

      'import/order': [
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
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // General
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      'no-debugger': 'error',

      // Maintainability
      complexity: ['warn', { max: 10 }],
      'max-depth': ['warn', { max: 4 }],
      'max-params': ['warn', { max: 4 }],
    },
  },

  prettier,
);
