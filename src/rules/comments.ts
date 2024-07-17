// @ts-expect-error - ESLint plugin import is not resolved correctly
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';

import { type TypedFlatConfigItem } from '../types';

const config: TypedFlatConfigItem = {
  name: 'javalce/javascript/eslint-comments',
  plugins: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- This is safe
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
