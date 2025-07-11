import type { OptionsPathAliases, TypedConfigItem } from '../../types';

import { type Linter } from 'eslint';

import { normalizeStringArray } from '../../utils';

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

export function createImportRules({ pathAliases }: OptionsPathAliases): TypedConfigItem {
  const customPathAliases = normalizeStringArray(pathAliases);

  return {
    name: 'typescript/import/rules',
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
          pathGroups: customPathAliases.map((pattern) => ({
            group: 'external',
            pattern,
            position: 'after',
          })),
        },
      ],
    },
  };
}
