import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function vitest({ typescript }: { typescript: boolean }): Promise<TypedConfigItem[]> {
  const vitestPlugin = await lazy(import('@vitest/eslint-plugin'));

  return [
    {
      files: TESTING_FILES,
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
      plugins: {
        vitest: vitestPlugin,
      },
      rules: {
        ...vitestPlugin.configs.recommended.rules,
      },
      name: 'vitest',
    },
    eslintConfigVitest,
  ];
}
