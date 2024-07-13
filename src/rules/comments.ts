// @ts-ignore
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments';
import { TypedFlatConfigItem } from '../types';

const config: TypedFlatConfigItem = {
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
