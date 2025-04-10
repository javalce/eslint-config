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
  const testingLibraryPlugin = await lazy(import('eslint-plugin-testing-library'));

  function makeConfig(name: 'react' | 'vue'): TypedConfigItem {
    return {
      files: TESTING_FILES,
      rules: {
        ...testingLibraryPlugin.configs[name].rules,
      },
      name: `testing-library/rules/${name}`,
    };
  }

  return [
    {
      plugins: {
        'testing-library': testingLibraryPlugin,
      },
      name: 'testing-library/setup',
    },
    react ? makeConfig('react') : {},
    vue ? makeConfig('vue') : {},
  ];
}
