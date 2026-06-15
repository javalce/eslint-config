import type { Config, OptionsJavascript } from '../types';

import js from '@eslint/js';
import globals from 'globals';

import bestPracticeConfig from '../rules/best-practice';
import es6Config from '../rules/es6';
import posibleErrorsConfig from '../rules/possible-errors';
import variablesConfig from '../rules/variables';

export function javascript({
  ecmaVersion = 2023,
  camelcaseAllows = [],
  overrides,
}: OptionsJavascript = {}): Config[] {
  return [
    {
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      languageOptions: {
        ecmaVersion,
        sourceType: 'module',
        globals: {
          ...globals[`es${ecmaVersion}`],
          ...globals.browser,
          ...globals.node,
        },
      },
      name: 'javascript/setup',
    },
    {
      ...js.configs.recommended,
      name: 'javascript/rules',
    },
    bestPracticeConfig,
    es6Config,
    posibleErrorsConfig,
    variablesConfig,
    {
      name: 'javascript/rules/stylistic',
      rules: {
        /**
         * Require camel case names.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/camelcase
         */
        camelcase: [
          'error',
          {
            allow: ['^UNSAFE_', ...camelcaseAllows],
            ignoreDestructuring: false,
            properties: 'never',
          },
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
        'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
        /**
         * Disallow use of the Array constructor.
         *
         * 🚫 Not fixable - https://eslint.org/docs/rules/no-array-constructor
         */
        'no-array-constructor': 'error',
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
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],
        /**
         * Require use of an object spread over Object.assign.
         *
         * 🔧 Fixable - https://eslint.org/docs/rules/prefer-object-spread
         */
        'prefer-object-spread': 'warn',
      },
    },
    {
      name: 'javascript/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
