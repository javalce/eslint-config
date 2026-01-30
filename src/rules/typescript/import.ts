import type { Linter } from 'eslint';

import type { Config } from '../../types';

/**
 * These are enabled by `import-x/recommended`, but are better handled by
 * TypeScript and @typescript-eslint.
 */
const disabledRules: Partial<Linter.RulesRecord> = {
  'import-x/default': 'off',
  'import-x/export': 'off',
  'import-x/namespace': 'off',
  'import-x/no-unresolved': 'off',
};

const config: Config = {
  name: 'typescript/import/rules',
  rules: {
    ...disabledRules,
  },
};

export default config;
