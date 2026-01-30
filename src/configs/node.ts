import type { TypedConfigItem } from '../types';

import pluginNode from 'eslint-plugin-n';

export function node(): TypedConfigItem[] {
  return [
    {
      name: 'node/setup',
      plugins: {
        node: pluginNode,
      },
    },
    {
      name: 'node/rules',
      rules: {
        'node/handle-callback-err': ['error', '^(err|error)$'],
        'node/no-deprecated-api': 'error',
        'node/no-exports-assign': 'error',
        'node/no-new-require': 'error',
        'node/no-path-concat': 'error',
        'node/process-exit-as-throw': 'error',
      },
    },
    {
      name: 'node/rules/overrides',
      rules: {},
    },
  ];
}
