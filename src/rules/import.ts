import { type TypedConfigItem } from '../types';

const config: TypedConfigItem = {
  name: 'javalce/javascript/import',
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
        pathGroups: [
          {
            group: 'external',
            pattern: '~/**',
            position: 'after',
          },
        ],
      },
    ],
  },
  settings: {
    'import-x/resolver': {
      node: {},
    },
  },
};

export default config;
