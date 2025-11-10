import type { OptionsPerfectionist, TypedConfigItem } from '../types';

import pluginPerfectionist from 'eslint-plugin-perfectionist';

export function perfectionist({ overrides }: OptionsPerfectionist = {}): TypedConfigItem[] {
  return [
    {
      name: 'perfectionist/setup',
      plugins: {
        perfectionist: pluginPerfectionist,
      },
    },
    {
      name: 'perfectionist/rules',
      rules: {
        'perfectionist/sort-exports': ['warn', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': [
          'warn',
          {
            groups: [
              'type', // Type imports
              ['parent-type', 'sibling-type', 'index-type', 'internal-type'], // Type imports from aliases and relative paths
              'builtin', // Node.js built-in modules
              'external', // Packages
              'internal', // Aliased modules
              ['parent', 'sibling', 'index'], // Relative imports
              'side-effect', // Side-effect imports
              'object', // Object imports
              'unknown', // Unknown imports
            ],
            newlinesBetween: 'always',
            order: 'asc',
            type: 'natural',
          },
        ],
        'perfectionist/sort-named-exports': ['warn', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['warn', { order: 'asc', type: 'natural' }],
      },
    },
    {
      name: 'perfectionist/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
