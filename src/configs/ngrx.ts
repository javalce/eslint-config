import { TS_FILES } from '../constants';
import { type OptionsNgrx, type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function ngrx({
  store,
  effects,
  componentStore,
  operators,
  signals,
  overrides,
}: OptionsNgrx = {}): Promise<TypedConfigItem[]> {
  const [ngrxPlugin, ngrxConfig] = await Promise.all([
    lazy(import('@ngrx/eslint-plugin')),
    lazy(import('@ngrx/eslint-plugin/v9')),
  ]);

  function makeConfig(name: keyof typeof ngrxConfig.configs): TypedConfigItem {
    return {
      name: `ngrx/${name}`,
      files: [TS_FILES],
      rules: {
        ...ngrxConfig.configs[name].at(-1)?.rules,
      },
    };
  }

  return [
    {
      name: 'ngrx/setup',
      plugins: {
        '@ngrx': {
          rules: ngrxPlugin.rules,
        },
      },
    },
    store ? makeConfig('store') : {},
    effects ? makeConfig('effects') : {},
    componentStore ? makeConfig('componentStore') : {},
    operators ? makeConfig('operators') : {},
    signals ? makeConfig('signals') : {},
    {
      name: 'ngrx/rules/overrides',
      files: [TS_FILES],
      rules: {
        ...overrides,
      },
    },
  ];
}
