import type { OptionsHasTypescript, OptionsVitest, TypedConfigItem } from '../types';

import vitestPlugin from '@vitest/eslint-plugin';

import { GLOB_TEST_FILES } from '../globs';
import eslintConfigVitest from '../rules/vitest';

export function vitest({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsVitest = {}): TypedConfigItem[] {
  return [
    {
      plugins: {
        vitest: vitestPlugin,
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
          ...vitestPlugin.environments.env.globals,
        },
      },
      name: 'vitest/setup',
    },
    {
      files: GLOB_TEST_FILES,
      rules: {
        ...vitestPlugin.configs.recommended.rules,
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
