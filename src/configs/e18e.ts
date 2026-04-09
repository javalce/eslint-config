import type { Linter } from 'eslint';

import type { Config, OptionsE18e, OptionsProjectType } from '../types';

import pluginE18e from '@e18e/eslint-plugin';

export function e18e(options: OptionsE18e & OptionsProjectType = {}): Config[] {
  const {
    modernization = true,
    type = 'app',
    moduleReplacements = type === 'lib',
    performanceImprovements = true,
    overrides,
  } = options;

  // TODO: better types needed on the e18e side
  const configs = pluginE18e.configs as Record<string, Linter.Config>;

  return [
    {
      name: 'e18e/setup',
      plugins: {
        e18e: pluginE18e,
      },
    },
    {
      name: 'e18e/rules',
      rules: {
        ...(modernization ? { ...configs.modernization.rules } : {}),
        ...(moduleReplacements ? { ...configs.moduleReplacements.rules } : {}),
        ...(performanceImprovements ? { ...configs.performanceImprovements.rules } : {}),

        // these are a bit opinionated and dangerous (introducing behavioral changes), so we'll disable them by default for now
        'e18e/prefer-array-at': 'off',
        'e18e/prefer-array-from-map': 'off',
        'e18e/prefer-array-to-reversed': 'off',
        'e18e/prefer-array-to-sorted': 'off',
        'e18e/prefer-array-to-spliced': 'off',
        'e18e/prefer-spread-syntax': 'off',
      },
    },
    {
      name: 'e18e/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
