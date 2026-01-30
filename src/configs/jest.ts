import type { Config, OptionsJest } from '../types';

import globals from 'globals';

import { GLOB_TEST_FILES, GLOB_TS_TEST_FILES } from '../globs';
import jestConfig from '../rules/jest';
import { ensureInstalled, resolveDefaultExport } from '../utils';

export async function jest({ overrides }: OptionsJest = {}): Promise<Config[]> {
  ensureInstalled(['eslint-plugin-jest']);

  const pluginJest = await resolveDefaultExport(import('eslint-plugin-jest'));

  return [
    {
      plugins: {
        jest: pluginJest,
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
        ...pluginJest.configs['flat/recommended'].rules,
        ...pluginJest.configs['flat/style'].rules,
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
