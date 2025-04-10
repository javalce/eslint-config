import { TESTING_FILES } from '../constants';
import { type TypedConfigItem } from '../types';

const config: TypedConfigItem = {
  files: TESTING_FILES,
  name: 'vitest/rules/stylistic',
  rules: {
    /**
     * It's not important to know the return type of functions in tests.
     *
     * 🚫 Not fixable - https://typescript-eslint.io/rules/explicit-function-return-type/
     */
    '@typescript-eslint/explicit-function-return-type': 'off',
    /**
     * Disallow use of `test` and `it` in the same file. Use only `it`.
     *
     * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/consistent-test-it.md
     */
    'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
    /**
     * Disallow duplicate setup and teardown hooks.
     *
     * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/no-duplicate-hooks.md
     */
    'vitest/no-duplicate-hooks': 'error',
    /**
     * Enforce having hooks in consistent order.
     *
     * 🚫 Not fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-hooks-in-order.md
     */
    'vitest/prefer-hooks-in-order': 'error',
    /**
     * Require lowercase test names.
     *
     * 🔧 Fixable - https://github.com/vitest-dev/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-lowercase-title.md
     */
    'vitest/prefer-lowercase-title': 'warn',
  },
};

export default config;
