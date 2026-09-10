import type { Config, OptionsNgrx } from '../types';

import { GLOB_TS_FILES } from '../globs';
import { ensureInstalled, resolveDefaultExport } from '../utils';

export async function ngrx({
  store = false,
  effects = false,
  componentStore = false,
  operators = false,
  signals = false,
  overrides,
}: OptionsNgrx = {}): Promise<Config[]> {
  ensureInstalled(['@ngrx/eslint-plugin']);

  const pluginNgrx = await resolveDefaultExport(import('@ngrx/eslint-plugin'));

  const configs: Array<[keyof typeof pluginNgrx.configs, boolean]> = [
    ['store', store],
    ['effects', effects],
    ['componentStore', componentStore],
    ['operators', operators],
    ['signals', signals],
  ];

  const result: Config[] = [
    {
      name: 'ngrx/setup',
      plugins: {
        '@ngrx': {
          rules: pluginNgrx.rules,
        },
      },
    },
    ...configs
      .filter(([, enable]) => enable)
      .map(([name]) => ({
        name: `ngrx/${name}`,
        files: [GLOB_TS_FILES],
        rules: {
          ...pluginNgrx.configs[name].at(-1)?.rules,
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
