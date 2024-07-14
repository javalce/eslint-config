import type { OptionsConfig, TypedFlatConfigItem } from './types';

import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import { javascript } from './configs/javascript';
import typescript from './configs/typescript';

export function defineConfig(options: OptionsConfig): FlatConfigComposer<TypedFlatConfigItem> {
  const { typescript: typescriptOptions, userConfigs = [] } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(javascript());

  if (typescriptOptions !== undefined) {
    configs.push(typescript(typescriptOptions));
  }

  const composer = new FlatConfigComposer<TypedFlatConfigItem>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- This is safe
  void composer.append(...configs, ...(userConfigs as any));

  return composer;
}
