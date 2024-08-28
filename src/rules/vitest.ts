import { type TypedFlatConfigItem } from 'src/types';
import { TESTING_FILES } from 'src/utils/constants';

const config: TypedFlatConfigItem = {
  files: TESTING_FILES,
  name: 'javalce/vitest',
  rules: {
    /**
     * Disallow duplicate setup and teardown hooks.
     *
     * 🚫 Not fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/no-duplicate-hooks.md
     */
    'vitest/no-duplicate-hooks': 'error',
    /**
     * Require lowercase test names.
     *
     * 🔧 Fixable - https://github.com/veritem/eslint-plugin-vitest/blob/HEAD/docs/rules/prefer-lowercase-title.md
     */
    'vitest/prefer-lowercase-title': 'warn',
  },
};

export default config;
