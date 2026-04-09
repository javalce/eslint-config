import type { Config, OptionsUnicorn } from '../types';

import pluginUnicorn from 'eslint-plugin-unicorn';

export function unicorn({ overrides }: OptionsUnicorn = {}): Config[] {
  return [
    {
      name: 'unicorn/setup',
      plugins: {
        unicorn: pluginUnicorn,
      },
    },
    {
      name: 'unicorn/rules',
      rules: {
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: [
              /**
               * Ignore routing file conventions for React Router and TanStack Router
               */
              '^\\$[a-zA-Z0-9]+\\.[jt]s?(x)$',
            ],
          },
        ],
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-instanceof-builtins': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/number-literal-case': 'error',
        'unicorn/prefer-dom-node-text-content': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error',
      },
    },
    {
      name: 'unicorn/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
