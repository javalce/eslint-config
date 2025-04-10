import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function vitest({ typescript }: { typescript: boolean }): Promise<TypedConfigItem[]> {
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
