import type { ESLint } from 'eslint';

import type { OptionsEslintComments, TypedConfigItem } from '../types';

// @ts-expect-error - ESLint plugin has no types
import commentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';

export function comments({ overrides }: OptionsEslintComments = {}): TypedConfigItem[] {
  return [
    {
      name: 'eslint-comments/setup',
      plugins: {
        'eslint-comments': commentsPlugin as ESLint.Plugin,
      },
    },
    {
      name: 'eslint-comments/rules',
      rules: {
        /**
         * Require comments on ESlint disable directives.
         *
         * 🚫 Not fixable - https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
         */
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
