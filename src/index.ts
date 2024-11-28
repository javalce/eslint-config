import type { Awaitable, ConfigNames, OptionsConfig, TypedConfigItem } from './types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import { astro } from './configs/astro';
import { ignores } from './configs/ignores';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { react } from './configs/react';
import { solidjs } from './configs/solidjs';
import { svelte } from './configs/svelte';
import { testingLibrary } from './configs/testing-library';
import { typescript } from './configs/typescript';
import { vitest } from './configs/vitest';
import { vue } from './configs/vue';
import { DEFAULT_ECMA_VERSION } from './constants';

export async function defineConfig(options: OptionsConfig): Promise<TypedConfigItem[]> {
  const {
    ecmaVersion = DEFAULT_ECMA_VERSION,
    typescript: enableTypeScript = isPackageExists('typescript'),
    react: reactFlag,
    astro: enableAstro,
    svelte: enableSvelte,
    solidjs: enableSolidjs,
    vue: enableVue,
    testing: enableTesting,
    overrides = [],
  } = options;

  const configs: Awaitable<TypedConfigItem[]>[] = [];

  configs.push(ignores(), javascript({ ecmaVersion }));

  const tsconfigPath = typeof enableTypeScript !== 'boolean' ? enableTypeScript : 'tsconfig.json';

  const enableReact = Boolean(reactFlag);
  const enableNext = reactFlag === 'next';

  if (enableTypeScript) {
    configs.push(
      typescript({
        tsconfigPath,
        type: options.type,
      }),
    );
  }

  if (enableReact) {
    configs.push(react());
  }

  if (enableNext) {
    configs.push(nextjs());
  }

  if (enableAstro) {
    configs.push(
      astro({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableSvelte) {
    configs.push(
      svelte({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableSolidjs) {
    configs.push(
      solidjs({
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableVue) {
    configs.push(
      vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: Boolean(enableTypeScript),
      }),
    );
  }

  if (enableTesting === 'jest') {
    configs.push(jest());
  }

  if (enableTesting === 'vitest') {
    configs.push(vitest());
  }

  if (enableTesting && (enableVue || enableReact)) {
    configs.push(
      testingLibrary({
        react: enableReact,
        vue: Boolean(enableVue),
      }),
    );
  }

  let composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...overrides);

  return composer.toConfigs();
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
