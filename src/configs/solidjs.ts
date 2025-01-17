import type { TypedConfigItem } from '../types';

import { JSX_FILES, TSX_FILES } from '../constants';
import { lazy } from '../utils';

export async function solid({ typescript }: { typescript: boolean }): Promise<TypedConfigItem[]> {
  const solidPlugin = await lazy(import('eslint-plugin-solid'));

  return [
    {
      name: 'javalce/solid/setup',
      plugins: {
        solid: solidPlugin,
      },
    },
    {
      files: [JSX_FILES, TSX_FILES],
      name: 'javalce/solid/rules',
      rules: {
        // reactivity
        'solid/components-return-once': 'warn',
        'solid/event-handlers': [
          'error',
          {
            // if true, don't warn on ambiguously named event handlers like `onclick` or `onchange`
            ignoreCase: false,
            // if true, warn when spreading event handlers onto JSX. Enable for Solid < v1.6.
            warnOnSpread: false,
          },
        ],
        // these rules are mostly style suggestions
        'solid/imports': 'error',
        // identifier usage is important
        'solid/jsx-no-duplicate-props': 'error',
        'solid/jsx-no-script-url': 'error',
        'solid/jsx-no-undef': 'error',
        'solid/jsx-uses-vars': 'error',
        'solid/no-destructure': 'error',
        // security problems
        'solid/no-innerhtml': ['error', { allowStatic: true }],
        'solid/no-react-deps': 'error',
        'solid/no-react-specific-props': 'error',
        'solid/no-unknown-namespaces': 'error',
        'solid/prefer-for': 'error',
        'solid/reactivity': 'warn',
        'solid/self-closing-comp': 'error',
        'solid/style-prop': ['error', { styleProps: ['style', 'css'] }],
        ...(typescript
          ? {
              'solid/jsx-no-undef': ['error', { typescriptEnabled: true }],
              'solid/no-unknown-namespaces': 'off',
            }
          : {}),
      },
    },
  ];
}
