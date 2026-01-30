import type { Config, OptionsHasTypescript, OptionsVitest } from '../types';

import { GLOB_TEST_FILES } from '../globs';
import eslintConfigVitest from '../rules/vitest';
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
    eslintConfigVitest,
    {
      files: GLOB_TEST_FILES,
      rules: {
        ...overrides,
      },
      name: 'vitest/rules/overrides',
    },
  ];
}
