import type { OptionsTestingLibrary, TypedConfigItem } from '../types';

import { TESTING_FILES } from '../constants';
import { ensureInstalled, lazy } from '../utils';

export async function testingLibrary({
  angular = false,
  react = false,
  svelte = false,
  vue = false,
  overrides,
}: {
  angular?: boolean;
  react?: boolean;
  svelte?: boolean;
  vue?: boolean;
} & OptionsTestingLibrary = {}): Promise<TypedConfigItem[]> {
  ensureInstalled('eslint-plugin-testing-library');

  const testingLibraryPlugin = await lazy(import('eslint-plugin-testing-library'));

  function makeConfig(name: 'angular' | 'react' | 'vue' | 'svelte'): TypedConfigItem {
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
    angular ? makeConfig('angular') : {},
    react ? makeConfig('react') : {},
    svelte ? makeConfig('svelte') : {},
    vue ? makeConfig('vue') : {},
    {
      files: TESTING_FILES,
      rules: {
        ...overrides,
      },
      name: 'testing-library/rules/overrides',
    },
  ];
}
