import gitignore from 'eslint-config-flat-gitignore';

import { type TypedConfigItem } from '../types';

export async function ignores(): Promise<TypedConfigItem[]> {
  return [
    {
      ...gitignore({ strict: false }),
      name: 'javalce/ignores',
    },
  ];
}
