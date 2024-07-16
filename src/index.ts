import type { OptionsConfig, TypedFlatConfigItem } from './types';

import { Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import { javascript } from './configs/javascript';
import typescript from './configs/typescript';

export function defineConfig(options: OptionsConfig): FlatConfigComposer<TypedFlatConfigItem> {
  const { typescript: enableTypeScript, userConfigs = [] } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(javascript());

  const typescriptOptions = resolveSubOptions(options, 'typescript');
  const tsconfigPath =
    'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : 'tsconfig.json';

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        tsconfigPath,
      }),
    );
  }

  const composer = new FlatConfigComposer<TypedFlatConfigItem>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- This is safe
  void composer.append(...configs, ...(userConfigs as any));

  return composer;
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-explicit-any -- This is safe
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}
