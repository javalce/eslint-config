import type { TypedConfigItem } from '../types';

import { TESTING_FILES } from '../constants';
import { lazy } from '../utils';

export async function testingLibrary({
  react,
  vue,
}: {
  react: boolean;
  vue: boolean;
}): Promise<TypedConfigItem[]> {
  const config: TypedConfigItem[] = [];

  const testingLibraryPlugin = await lazy(import('eslint-plugin-testing-library'));

  if (react) {
    config.push({
      files: TESTING_FILES,
      ...(testingLibraryPlugin.configs['flat/react'] as TypedConfigItem),
      name: 'testing-library/react',
    });
  }

  if (vue) {
    config.push({
      files: TESTING_FILES,
      ...(testingLibraryPlugin.configs['flat/vue'] as TypedConfigItem),
      name: 'testing-library/vue',
    });
  }

  return config;
}
