import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';
import { javascript } from './configs/javascript';
import typescript from './configs/typescript';
import type { OptionsConfig, TypedFlatConfigItem } from './types';

export function defineConfig(options: OptionsConfig): FlatConfigComposer<TypedFlatConfigItem> {
  const { typescript: enableTypescript = false, userConfigs = [] } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(javascript());

  if (enableTypescript) {
    configs.push(typescript());
  }

  let composer = new FlatConfigComposer();

  composer.append(...configs, ...(userConfigs as any));

  return composer;
}
