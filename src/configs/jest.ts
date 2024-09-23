import globals from 'globals';

import { TESTING_FILES, TS_TESTING_FILES } from '../constants';
import jestConfig from '../rules/jest';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function jest(): Promise<TypedConfigItem[]> {
  const jestPlugin = await lazy(import('eslint-plugin-jest'));

  return [
    {
      files: TESTING_FILES,
      ...(jestPlugin.configs['flat/recommended'] as TypedConfigItem),
      ...(jestPlugin.configs['flat/style'] as TypedConfigItem),
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
      files: TS_TESTING_FILES,
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
      name: 'jest/unbound-method',
    },
  ];
}
