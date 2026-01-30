import type { Config } from '../types';

import { GLOB_TEST_FILES } from '../globs';

const config: Config = {
  files: GLOB_TEST_FILES,
  name: 'jest/rules/stylistic',
  rules: {
    /**
     * Disallow duplicate setup and teardown hooks.
     *
     * 🚫 Not fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-duplicate-hooks.md
     */
    'jest/no-duplicate-hooks': 'error',
    /**
     * Require lowercase test names.
     *
     * 🔧 Fixable - https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
     */
    'jest/prefer-lowercase-title': ['warn', { ignoreTopLevelDescribe: true }],
  },
};

export default config;
