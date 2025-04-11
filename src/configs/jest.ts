import globals from 'globals';

import { TESTING_FILES, TS_TESTING_FILES } from '../constants';
import jestConfig from '../rules/jest';
import { type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function jest(): Promise<TypedConfigItem[]> {
  ensureInstalled('eslint-plugin-jest');

  const jestPlugin = await lazy(import('eslint-plugin-jest'));

  return [
    {
      plugins: {
        jest: jestPlugin,
      },
      languageOptions: {
        globals: {
          ...globals.jest,
        },
      },
      name: 'jest/setup',
    },
    {
      files: TESTING_FILES,
      rules: {
        ...jestPlugin.configs['flat/recommended'].rules,
        ...jestPlugin.configs['flat/style'].rules,
      },
      name: 'jest/rules',
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
      name: 'jest/rules/unbound-method',
    },
  ];
}
