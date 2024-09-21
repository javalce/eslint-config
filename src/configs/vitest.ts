import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function vitest({ react }: { react: boolean }): Promise<TypedConfigItem[]> {
  const [vitestPlugin, testingLibraryPlugin] = await Promise.all([
    lazy(import('@vitest/eslint-plugin')),
    lazy(import('eslint-plugin-testing-library')),
  ] as const);

  const config: TypedConfigItem[] = [
    {
      files: TESTING_FILES,
      plugins: {
        vitest: vitestPlugin,
      },
      rules: {
        ...vitestPlugin.configs.recommended.rules,
      },
      settings: {
        vitest: {
          typecheck: true,
        },
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

  if (react) {
    config.push({
      files: TESTING_FILES,
      ...(testingLibraryPlugin.configs['flat/react'] as TypedConfigItem),
      name: 'testing-library',
    });
  }

  return config;
}
