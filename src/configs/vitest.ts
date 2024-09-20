import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';

import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';

export function vitest({ react }: { react: boolean }): TypedConfigItem[] {
  const config: TypedConfigItem[] = [
    {
      files: TESTING_FILES,
      plugins: {
        vitest: eslintPluginVitest,
      },
      rules: {
        ...eslintPluginVitest.configs.recommended.rules,
      },
      settings: {
        vitest: {
          typecheck: true,
        },
      },
      languageOptions: {
        globals: {
          ...eslintPluginVitest.environments.env.globals,
        },
      },
      name: 'vitest',
    },
    eslintConfigVitest,
  ];

  if (react) {
    config.push({
      files: TESTING_FILES,
      ...(eslintPluginTestingLibrary.configs['flat/react'] as TypedConfigItem),
      name: 'testing-library',
    });
  }

  return config;
}
