import gitignore from 'eslint-config-flat-gitignore';

import { type TypedConfigItem } from '../types';

export function ignores(): TypedConfigItem[] {
  return [
    {
      ...gitignore({ strict: false }),
      name: 'javalce/ignores',
    },
  ];
}
