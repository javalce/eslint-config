import type { OptionsConfig, TypedFlatConfigItem } from './types';

import { type Awaitable, FlatConfigComposer } from 'eslint-flat-config-utils';

import { ignores, javascript, react, typescript } from './configs';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { vitest } from './configs/vitest';
import { type ConfigNames } from './typegen';

export function defineConfig(
  options: OptionsConfig,
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    typescript: enableTypeScript,
    react: enableReact,
    next: enableNextjs,
    testing: enableTesting,
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

  if (enableTesting === 'jest') {
    configs.push(
      jest({
        react: Boolean(enableReact),
      }),
    );
  }

  if (enableTesting === 'vitest') {
    configs.push(
      vitest({
        react: Boolean(enableReact),
      }),
    );
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
