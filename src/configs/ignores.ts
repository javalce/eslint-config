import gitignore from 'eslint-config-flat-gitignore';

import { type TypedFlatConfigItem } from 'src/types';

export async function ignores(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ...gitignore({ strict: false }),
      name: 'javalce/ignores',
    },
  ];
}
