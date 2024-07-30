import type { OptionsConfig, TypedFlatConfigItem } from './types';

import { type Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import { ignores, javascript, react, typescript } from './configs';
import { nextjs } from './configs/nextjs';
import { type ConfigNames } from './typegen';

export function defineConfig(
  options: OptionsConfig,
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    typescript: enableTypeScript,
    react: enableReact,
    nextjs: enableNextjs,
    userConfigs = [],
  } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = [];

  configs.push(ignores(), javascript());

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

  if (enableReact) {
    configs.push(
      react({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableNextjs) {
    configs.push(nextjs());
  }

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...(userConfigs as any));

  return composer;
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || {};
}
