import type { OptionsConfig, TypedConfigItem } from './types';

import { astro } from './configs/astro';
import { ignores } from './configs/ignores';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { react } from './configs/react';
import { solidjs } from './configs/solidjs';
import { svelte } from './configs/svelte';
import { typescript } from './configs/typescript';
import { vitest } from './configs/vitest';
import { vue } from './configs/vue';
import { hasPackage } from './utils';

export async function defineConfig(options: OptionsConfig): Promise<TypedConfigItem[]> {
  const {
    ecmaVersion = 2021,
    typescript: enableTypeScript = hasPackage('typescript'),
    react: reactFlag,
    astro: enableAstro,
    svelte: enableSvelte,
    solidjs: enableSolidjs,
    vue: enableVue,
    testing: enableTesting,
    overrides = [],
  } = options;

  const configs: TypedConfigItem[][] = [];

  configs.push(ignores(), javascript({ ecmaVersion }));

  const tsconfigPath = typeof enableTypeScript !== 'boolean' ? enableTypeScript : 'tsconfig.json';

  const enableReact = Boolean(reactFlag);
  const enableNext = reactFlag === 'next';

  if (enableTypeScript) {
    configs.push(
      typescript({
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

  if (enableNext) {
    configs.push(await nextjs());
  }

  if (enableAstro) {
    configs.push(astro());
  }

  if (enableSvelte) {
    configs.push(
      await svelte({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableSolidjs) {
    configs.push(
      await solidjs({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableVue) {
    configs.push(
      await vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableTesting === 'jest') {
    configs.push(
      jest({
        react: enableReact,
      }),
    );
  }

  if (enableTesting === 'vitest') {
    configs.push(
      vitest({
        react: enableReact,
      }),
    );
  }

  return [...configs.flat(), ...overrides];
}

type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? ({} as ResolvedOptions<OptionsConfig[K]>)
    : (options[key] as ResolvedOptions<OptionsConfig[K]>);
}
