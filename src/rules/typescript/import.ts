import type { TypedConfigItem } from '../../types';

import { type Linter } from 'eslint';

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

const config: TypedConfigItem = {
  name: 'javalce/typescript/import',
  rules: {
    ...disabledRules,
    'import-x/order': [
      'warn',
      {
        groups: [
          'type', // TypeScript types
          'builtin', // Node.js built-in modules
          'object', // Object imports
          'external', // Packages
          'internal', // Aliased modules
          'parent', // Relative parent
          'sibling', // Relative sibling
          'index', // Relative index
        ],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: '~/**',
            position: 'after',
          },
        ],
      },
    ],
  },
};

export default config;
