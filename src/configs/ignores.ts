import gitignore from 'eslint-config-flat-gitignore';

import { type ConfigItem } from '../types';

export async function ignores(): Promise<ConfigItem[]> {
  return [
    {
      ...gitignore({ strict: false }),
      name: 'javalce/ignores',
    },
  ];
}
