import { fixupPluginRules } from '@eslint/compat';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import eslintPluginVitest from 'eslint-plugin-vitest';

import { TESTING_FILES } from '../constants';
import eslintConfigVitest from '../rules/vitest';
import { type TypedConfigItem } from '../types';

export async function vitest({ react }: { react: boolean }): Promise<TypedConfigItem[]> {
  const config: TypedConfigItem[] = [
    {
      files: TESTING_FILES,
      plugins: {
        vitest: fixupPluginRules(eslintPluginVitest),
      },
      rules: {
        ...eslintPluginVitest.configs.recommended.rules,
      },
      name: 'vitest',
    },
    eslintConfigVitest,
  ];

  if (react) {
    config.push({
      files: TESTING_FILES,
      plugins: {
        'testing-library': fixupPluginRules(eslintPluginTestingLibrary),
      },
      rules: {
        ...eslintPluginTestingLibrary.configs.react.rules,
      },
      name: 'testing-library',
    });
  }

  return config;
}
