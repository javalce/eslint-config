import type { ESLint, Linter } from 'eslint';
import type { TypedConfigItem } from '../types';

import { fixupPluginRules } from '@eslint/compat';

import { TESTING_FILES } from '../constants';
import { lazy } from '../utils';

export async function testingLibrary({
  react,
  vue,
}: {
  react: boolean;
  vue: boolean;
}): Promise<TypedConfigItem[]> {
  const testingLibraryPlugin = await lazy(import('eslint-plugin-testing-library'));
  const config: TypedConfigItem[] = [
    {
      files: TESTING_FILES,
      plugins: {
        'testing-library': fixupPluginRules(testingLibraryPlugin as ESLint.Plugin),
      },
    },
  ];

  if (react) {
    config.push({
      files: TESTING_FILES,
      rules: {
        ...(testingLibraryPlugin.configs.react.rules as Linter.RulesRecord),
      },
      name: 'testing-library/react',
    });
  }

  if (vue) {
    config.push({
      files: TESTING_FILES,
      rules: {
        ...(testingLibraryPlugin.configs.vue.rules as Linter.RulesRecord),
      },
      name: 'testing-library/vue',
    });
  }

  return config;
}
