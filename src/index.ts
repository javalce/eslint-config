import { Linter } from 'eslint';
import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';
import { javascript } from './configs/javascript';
import type { TypedFlatConfigItem } from './types';

export default function javalce(
  ...userConfigs: Awaitable<TypedFlatConfigItem[] | Linter.FlatConfig[]>[]
): FlatConfigComposer<TypedFlatConfigItem> {
  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(javascript());

  let composer = new FlatConfigComposer();

  composer.append(...configs, ...(userConfigs as any));

  return composer;
}
