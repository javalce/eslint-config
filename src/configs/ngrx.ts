import type { OptionsNgrx, TypedConfigItem } from '../types';

import ngrxPlugin from '@ngrx/eslint-plugin';
import ngrxConfig from '@ngrx/eslint-plugin/v9';

import { GLOB_TS_FILES } from '../globs';

export function ngrx({
  store = false,
  effects = false,
  componentStore = false,
  operators = false,
  signals = false,
  overrides,
}: OptionsNgrx = {}): TypedConfigItem[] {
  const configs: Array<[keyof typeof ngrxConfig.configs, boolean]> = [
    ['store', store],
    ['effects', effects],
    ['componentStore', componentStore],
    ['operators', operators],
    ['signals', signals],
  ];

  const result: TypedConfigItem[] = [
    {
      name: 'ngrx/setup',
      plugins: {
        '@ngrx': {
          rules: ngrxPlugin.rules,
        },
      },
    },
    ...configs
      .filter(([, enable]) => enable)
      .map(([name]) => ({
        name: `ngrx/${name}`,
        files: [GLOB_TS_FILES],
        rules: {
          ...ngrxConfig.configs[name].at(-1)?.rules,
        },
      })),
    {
      name: 'ngrx/rules/overrides',
      files: [GLOB_TS_FILES],
      rules: {
        ...overrides,
      },
    },
  ];

  return result;
}
