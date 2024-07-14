import { Linter } from 'eslint';
import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';
import { javascript } from './configs/javascript';
import typescript from './configs/typescript';
import type { OptionsConfig, TypedFlatConfigItem } from './types';

export default function javalce(
  options: OptionsConfig & TypedFlatConfigItem = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem[] | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem> {
  const { typescript: enableTypescript = false } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(javascript());

  if (enableTypescript) {
    configs.push(typescript());
  }

  let composer = new FlatConfigComposer();

  composer.append(...configs, ...(userConfigs as any));

  return composer;
}
