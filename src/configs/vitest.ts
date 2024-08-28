import { fixupPluginRules } from '@eslint/compat';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import eslintPluginVitest from 'eslint-plugin-vitest';

import eslintConfigVitest from '../rules/vitest';
import { type ConfigItem } from '../types';
import { TESTING_FILES } from '../utils/constants';

export async function vitest({ react }: { react: boolean }): Promise<ConfigItem[]> {
  const config: ConfigItem[] = [
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
