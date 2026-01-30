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

  const [pluginNgrx, ngrxConfig] = await Promise.all([
    resolveDefaultExport(import('@ngrx/eslint-plugin')),
    resolveDefaultExport(import('@ngrx/eslint-plugin/v9')),
  ]);

  const configs: Array<[keyof typeof ngrxConfig.configs, boolean]> = [
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
