import gitignore from 'eslint-config-flat-gitignore';

import { type TypedConfigItem } from '../types';

export function ignores({ files }: { files?: string[] }): TypedConfigItem[] {
  return [
    {
      ...gitignore({ strict: false }),
      name: 'javalce/gitignore',
    },
    files
      ? {
          ignores: files,
          name: 'javalce/ignores',
        }
      : {},
  ];
}
