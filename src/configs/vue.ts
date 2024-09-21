import type { TypedConfigItem, VueVersion } from '../types';

import tseslint from 'typescript-eslint';

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
    config.push({
      name: 'javalce/vue/typescript',
      files: [VUE_FILES],
      languageOptions: {
        extraFileExtension: ['.vue'],
        parser: tseslint.parser,
      },
    } as TypedConfigItem);
  }

  return config;
}
