import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type OptionsHasTypescript, type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function vitest({ typescript }: OptionsHasTypescript): Promise<TypedConfigItem[]> {
  ensureInstalled('@vitest/eslint-plugin');

  const vitestPlugin = await lazy(import('@vitest/eslint-plugin'));

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
      files: TESTING_FILES,
      rules: {
        ...vitestPlugin.configs.recommended.rules,
      },
      name: 'vitest/rules',
    },
    eslintConfigVitest,
  ];
}
