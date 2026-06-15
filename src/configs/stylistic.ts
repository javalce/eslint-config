import type { Config, OptionsStylistic } from '../types';

import pluginStylistic from '@stylistic/eslint-plugin';

export function stylistic({ overrides }: OptionsStylistic = {}): Config[] {
  return [
    {
      plugins: {
        '@stylistic': pluginStylistic,
      },
      name: 'stylistic/setup',
    },
    {
      name: 'stylistic/rules',
      rules: {
        /**
         * Disallow the omission of parentheses when invoking a constructor with
         * no arguments.
         *
         * 🔧 Fixable - https://eslint.style/rules/js/new-parens
         */
        '@stylistic/new-parens': 'warn',
        /**
         * Disallow the use of extra semicolons.
         *
         * 🔧 Fixable - https://eslint.style/rules/js/no-extra-semi
         */
        '@stylistic/no-extra-semi': 'error',
        /**
         * Disallow floating decimals.
         *
         * 🔧 Fixable - https://eslint.style/rules/js/no-floating-decimal
         */
        '@stylistic/no-floating-decimal': 'error',
        /**
         * Require padding lines between statements.
         *
         * 🔧 Fixable - https://eslint.style/rules/js/padding-line-between-statements
         */

        '@stylistic/padding-line-between-statements': [
          'warn',
          { blankLine: 'always', prev: '*', next: ['return', 'export'] },
          { blankLine: 'always', prev: 'export', next: '*' },
          { blankLine: 'any', prev: 'export', next: 'export' },
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
          { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
        ],
      },
    },
    {
      name: 'stylistic/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
