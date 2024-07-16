import { gitignore } from 'eslint-flat-config-gitignore';

import { type TypedFlatConfigItem } from 'src/types';

export async function ignores(): Promise<TypedFlatConfigItem[]> {
  return [await gitignore(process.cwd())];
}
