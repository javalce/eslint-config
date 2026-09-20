import type { Config, OptionsHasTypescript, OptionsVitest } from '../types';

import { GLOB_TEST_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

export async function vitest({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsVitest = {}): Promise<Config[]> {
  ensureInstalled(['@vitest/eslint-plugin']);

  const pluginVitest = await resolveDefaultExport(import('@vitest/eslint-plugin'));

  return [
    {
      plugins: {
        vitest: pluginVitest,
      },
      ...(typescript
        ? {
            settings: {
              vitest: {
                typecheck: true,
              },
            },
          }
        : {}),
      languageOptions: {
        globals: {
          ...pluginVitest.environments.env.globals,
        },
      },
      name: 'vitest/setup',
    },
    {
      files: GLOB_TEST_FILES,
      rules: {
        ...pluginVitest.configs.recommended.rules,
      },
      name: 'vitest/rules',
    },
    {
      files: GLOB_TEST_FILES,
      name: 'vitest/rules/stylistic',
      rules: {
        /**
         * It's not important to know the return type of functions in tests.
         *
         * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
         */
        '@typescript-eslint/explicit-function-return-type': 'off',
        /**
         * Disallow use of `test` and `it` in the same file. Use only `it`.
         *
         * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/consistent-test-it.md
         */
        'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
        /**
         * Disallow duplicate setup and teardown hooks.
         *
         * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/no-duplicate-hooks.md
         */
        'vitest/no-duplicate-hooks': 'error',
        /**
         * Enforce having hooks in consistent order.
         *
         * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-hooks-in-order.md
         */
        'vitest/prefer-hooks-in-order': 'error',
        /**
         * Require lowercase test names.
         *
         * 🔧 Fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-lowercase-title.md
         */
        'vitest/prefer-lowercase-title': ['warn', { ignoreTopLevelDescribe: true }],
      },
    },
    {
      files: GLOB_TEST_FILES,
      rules: {
        ...overrides,
      },
      name: 'vitest/rules/overrides',
    },
  ];
}
