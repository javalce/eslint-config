import type { ESLint } from 'eslint';

import type { Config, OptionsEslintComments } from '../types';

import pluginComments from '@eslint-community/eslint-plugin-eslint-comments';

export function comments({ overrides }: OptionsEslintComments = {}): Config[] {
  return [
    {
      name: 'eslint-comments/setup',
      plugins: {
        'eslint-comments': pluginComments as ESLint.Plugin,
      },
    },
    {
      name: 'eslint-comments/rules',
      rules: {
        'eslint-comments/no-aggregating-enable': 'error',
        'eslint-comments/no-duplicate-disable': 'error',
        'eslint-comments/no-unlimited-disable': 'error',
        'eslint-comments/no-unused-enable': 'error',
        'eslint-comments/require-description': 'error',
      },
    },
    {
      name: 'eslint-comments/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
