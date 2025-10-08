import type { OptionsJest, TypedConfigItem } from '../types';

import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

import { GLOB_TEST_FILES, GLOB_TS_TEST_FILES } from '../globs';
import jestConfig from '../rules/jest';

export function jest({ overrides }: OptionsJest = {}): TypedConfigItem[] {
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
      files: GLOB_TEST_FILES,
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
      files: GLOB_TS_TEST_FILES,
      rules: {
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
      name: 'jest/rules/unbound-method',
    },
    {
      files: GLOB_TEST_FILES,
      rules: {
        ...overrides,
      },
      name: 'jest/rules/overrides',
    },
  ];
}
