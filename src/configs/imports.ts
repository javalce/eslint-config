import type { OptionsImport, TypedConfigItem } from '../types';

import eslintPluginImport from 'eslint-plugin-import-x';

import { GLOB_CONFIG_FILES } from '../globs';
import { createPathAliases } from '../utils';

export function imports({ pathAliases, overrides }: OptionsImport = {}): TypedConfigItem[] {
  const customPathAliases = createPathAliases({ pathAliases });

  return [
    {
      plugins: {
        'import-x': eslintPluginImport,
      },
      name: 'import/setup',
    },
    {
      name: 'import/rules',
      rules: {
        /**
         * Disallow non-import statements appearing before import statements.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/first.md
         */
        'import-x/first': 'error',
        /**
         * Require a newline after the last import-x/require.
         *
         * 🔧 Fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md
         */
        'import-x/newline-after-import': 'warn',
        /**
         * Disallow import of modules using absolute paths.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-absolute-path.md
         */
        'import-x/no-absolute-path': 'error',
        /**
         * Disallow cyclical dependencies between modules.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-cycle.md
         */
        'import-x/no-cycle': 'error',
        /**
         * Disallow default exports.
         *
         * 🚫 Not fixable - https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
         */
        'import-x/no-default-export': 'error',
        /**
         * Disallow the use of extraneous packages.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-extraneous-dependencies.md
         */
        'import-x/no-extraneous-dependencies': ['error', { includeTypes: true }],
        /**
         * Disallow mutable exports.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-mutable-exports.md
         */
        'import-x/no-mutable-exports': 'error',
        /**
         * Reports use of a default export as a locally named import.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-named-default.md
         */
        'import-x/no-named-default': 'warn',
        /**
         * Disallow importing packages through relative paths.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-relative-packages.md
         */
        'import-x/no-relative-packages': 'warn',
        /**
         * Disallow a module from importing itself.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-self-import.md
         */
        'import-x/no-self-import': 'error',
        /**
         * Ensures that there are no useless path segments.
         *
         * 🚫 Not fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-useless-path-segments.md
         */
        'import-x/no-useless-path-segments': ['error'],
        /**
         * Enforce a module import order convention.
         *
         * 🔧 Fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
         */
        'import-x/order': [
          'warn',
          {
            groups: [
              'builtin', // Node.js built-in modules
              'external', // Packages
              'internal', // Aliased modules
              'parent', // Relative parent
              'sibling', // Relative sibling
              'index', // Relative index
            ],
            'newlines-between': 'always',
            pathGroups: customPathAliases.map((pattern) => ({
              group: 'external',
              pattern,
              position: 'after',
            })),
          },
        ],
      },
      settings: {
        'import-x/resolver': {
          node: {},
        },
      },
    },
    {
      files: GLOB_CONFIG_FILES,
      rules: {
        'import-x/no-default-export': 'off',
      },
      name: 'import/rules/no-default-export',
    },
    {
      name: 'import/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
