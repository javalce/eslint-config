import type { Config, OptionsHasTypescript, OptionsImport, OptionsTsconfigPath } from '../types';

import { resolve } from 'node:path';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver, importX as pluginImport } from 'eslint-plugin-import-x';

export function imports({
  typescript,
  tsconfigPath = 'tsconfig.json',
  overrides,
}: OptionsHasTypescript & OptionsTsconfigPath & OptionsImport = {}): Config[] {
  return [
    {
      plugins: {
        'import-x': pluginImport,
      },
      name: 'import/setup',
    },
    {
      name: 'import/resolver',
      settings: {
        'import-x/resolver-next': [
          ...(typescript
            ? [
                createTypeScriptImportResolver({
                  alwaysTryTypes: true,
                  // @ts-expect-error -- Bun global variable only available in Bun runtime
                  bun: typeof Bun !== 'undefined' || process.release.name === 'bun',
                  ...(tsconfigPath ? { project: resolve(process.cwd(), tsconfigPath) } : {}),
                }),
              ]
            : []),
          createNodeResolver(),
        ],
      },
    },
    {
      settings: {
        ...pluginImport.flatConfigs.react.settings,
        ...(typescript ? pluginImport.flatConfigs.typescript.settings : {}),
      },
      name: 'import/extensions',
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
         * Enforce using top-level type specifiers instead of inline type specifiers.
         *
         * 🔧 Fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
         */
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        /**
         * Require a newline after the last import-x/require.
         *
         * 🔧 Fixable - https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md
         */
        'import-x/newline-after-import': ['warn', { count: 1 }],
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
      },
    },
    {
      name: 'import/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
