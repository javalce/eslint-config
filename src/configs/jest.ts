import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';

import { TESTING_FILES, TYPESCRIPT_TESTING_FILES } from '../constants';
import jestConfig from '../rules/jest';
import { type TypedConfigItem } from '../types';

export function jest({ react }: { react: boolean }): TypedConfigItem[] {
  const config: TypedConfigItem[] = [
    {
      files: TESTING_FILES,
      ...(eslintPluginJest.configs['flat/recommended'] as TypedConfigItem),
      ...(eslintPluginJest.configs['flat/style'] as TypedConfigItem),
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
      name: 'jest',
    },
    jestConfig,
    // Prefer the Jest version of this rule. This silently fails when type
    // information is not available.
    {
      files: TYPESCRIPT_TESTING_FILES,
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
      name: 'jest/unbound-method',
    },
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
