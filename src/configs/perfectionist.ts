import type { Config, OptionsPerfectionist } from '../types';

import pluginPerfectionist from 'eslint-plugin-perfectionist';

export function perfectionist({ overrides }: OptionsPerfectionist = {}): Config[] {
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
              'type-import', // Any type imports
              ['type-parent', 'type-sibling', 'type-index', 'type-internal'], // Type imports from aliases and relative paths
              'value-builtin', // Node.js built-in modules
              'value-external', // Packages
              'value-internal', // Aliased modules
              ['value-parent', 'value-sibling', 'value-index'], // Relative imports
              'side-effect', // Side-effect imports
              'ts-equals-import', // Any other imports
              'unknown', // Unknown imports
            ],
            newlinesBetween: 1,
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
