import type { OptionsUnicorn, TypedConfigItem } from '../types';

import unicornPlugin from 'eslint-plugin-unicorn';

export function unicorn({ overrides }: OptionsUnicorn = {}): TypedConfigItem[] {
  return [
    {
      name: 'unicorn/setup',
      plugins: {
        unicorn: unicornPlugin,
      },
    },
    {
      name: 'unicorn/rules',
      rules: {
        /**
         * Require consistent filename case for all linted files.
         *
         * 🚫 Not fixable - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
         */
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: [
              /**
               * Ignore routing file conventions for React Router and TanStack Router
               *
               * @see https://tanstack.com/router/latest/docs/framework/react/routing/file-naming-conventions
               */
              '^\\$[a-zA-Z0-9]+\\.[jt]s?(x)$',
            ],
          },
        ],
        /**
         * Require using the `node:` protocol when importing Node.js built-in modules.
         *
         * 🔧 Fixable - https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
         */
        'unicorn/prefer-node-protocol': 'warn',
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
