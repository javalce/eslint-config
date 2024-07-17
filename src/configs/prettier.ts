import eslintConfigPrettier from 'eslint-config-prettier';

import { type TypedFlatConfigItem } from 'src/types';

export async function prettier(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ...eslintConfigPrettier,
      name: 'prettier',
    },
  ];
}
