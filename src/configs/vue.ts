import type { TypedConfigItem, VueVersion } from '../types';

import { VUE_FILES } from '../constants';
import { lazy } from '../utils';

export async function vue({
  typescript,
  version = 3,
}: {
  typescript: boolean;
  version?: VueVersion;
}): Promise<TypedConfigItem[]> {
  const pluginVue = await lazy(import('eslint-plugin-vue'));

  const config: TypedConfigItem[] = [
    ...((version === 3
      ? pluginVue.configs['flat/recommended']
      : pluginVue.configs['flat/vue2-recommended']) as TypedConfigItem[]),
  ];

  if (typescript) {
    const tseslint = await lazy(import('typescript-eslint'));

    config.push({
      name: 'javalce/vue/typescript',
      files: [VUE_FILES],
      languageOptions: {
        parserOptions: {
          extraFileExtensions: ['.vue'],
          parser: tseslint.parser,
          sourceType: 'module',
        },
      },
    } as TypedConfigItem);
  }

  return config;
}
