// @ts-expect-error - ESLint plugin import is not resolved correctly
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';

import { type ConfigItem } from '../types';

const config: ConfigItem = {
  name: 'javalce/javascript/eslint-comments',
  plugins: {
    'eslint-comments': eslintCommentsPlugin,
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
