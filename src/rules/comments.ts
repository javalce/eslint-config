import { type ESLint } from 'eslint';
// @ts-expect-error - ESLint plugin import is not resolved correctly
import eslintCommentsPlugin from '@eslint-community/eslint-plugin-eslint-comments';

import { type TypedConfigItem } from '../types';

const config: TypedConfigItem = {
  name: 'javascript/eslint-comments/rules',
  plugins: {
    'eslint-comments': eslintCommentsPlugin as ESLint.Plugin,
  },
  rules: {
    /**
     * Require comments on ESlint disable directives.
     *
     * 🚫 Not fixable - https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/require-description.html
     */
    'eslint-comments/require-description': 'error',
  },
};

export default config;
