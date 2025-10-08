import type {
  OptionsHasTypescript,
  OptionsImport,
  OptionsTsconfigPath,
  TypedConfigItem,
} from '../types';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';

import { GLOB_CONFIG_FILES, GLOB_SRC_FILES, GLOB_TS_FILES, GLOB_TSX_FILES } from '../globs';
import { resolveRelativePath, resolveTsconfig } from '../utils';

export function imports({
  typescript,
  tsconfigPath,
  overrides,
}: OptionsHasTypescript & OptionsTsconfigPath & OptionsImport = {}): TypedConfigItem[] {
  return [
    {
      plugins: {
        'import-x': importX,
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
                  bun: true,
                  project: resolveRelativePath(resolveTsconfig(tsconfigPath)),
                }),
              ]
            : []),
          createNodeResolver(),
        ],
      },
    },
    {
      files: [GLOB_TS_FILES, GLOB_TSX_FILES],
      settings: {
        ...importX.flatConfigs.typescript.settings,
      },
      rules: {
        ...importX.flatConfigs.typescript.rules,
      },
      name: 'import/typescript',
    },
    {
      files: [GLOB_SRC_FILES],
      settings: {
        ...importX.flatConfigs.react.settings,
      },
      languageOptions: {
        ...importX.flatConfigs.react.languageOptions,
      },
      name: 'import/jsx',
    } as TypedConfigItem,
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
