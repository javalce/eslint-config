import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function vitest(): Promise<TypedConfigItem[]> {
  const vitestPlugin = await lazy(import('@vitest/eslint-plugin'));

  return [
    {
      files: TESTING_FILES,
      plugins: {
        vitest: vitestPlugin,
      },
      rules: {
        ...vitestPlugin.configs.recommended.rules,
      },
      languageOptions: {
        globals: {
          ...vitestPlugin.environments.env.globals,
        },
      },
      name: 'vitest',
    },
    eslintConfigVitest,
  ];
}
