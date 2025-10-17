import type { OptionsStylistic, TypedConfigItem } from '../types';

import pluginStylistic from '@stylistic/eslint-plugin';

export function stylistic({ overrides }: OptionsStylistic = {}): TypedConfigItem[] {
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
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        ],
        /**
         * Require camel case names.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/camelcase
         */
        camelcase: [
          'error',
          { allow: ['^UNSAFE_'], ignoreDestructuring: false, properties: 'never' },
        ],
        /**
         * Require function expressions to have a name.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/func-names
         */
        'func-names': ['error', 'as-needed'],
        /**
         * Require a capital letter for constructors.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/new-cap
         */
        'new-cap': ['error', { capIsNew: false }],
        /**
         * Disallow use of the Array constructor.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-array-constructor
         */
        'no-array-constructor': 'error',
        /**
         * Disallow use of bitwise operators.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-bitwise
         */
        'no-bitwise': 'error',
        /**
         * Disallow if as the only statement in an else block.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/no-lonely-if
         */
        'no-lonely-if': 'warn',
        /**
         * Disallow use of chained assignment expressions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-multi-assign
         */
        'no-multi-assign': ['error'],
        /**
         * Disallow nested ternary expressions.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-nested-ternary
         */
        'no-nested-ternary': 'error',
        /**
         * Disallow ternary operators when simpler alternatives exist.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-unneeded-ternary
         */
        'no-unneeded-ternary': 'error',
        /**
         * Require use of an object spread over Object.assign.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-object-spread
         */
        'prefer-object-spread': 'warn',
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
