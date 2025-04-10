import type { Awaitable, ConfigNames, OptionsConfig, TypedConfigItem } from './types';

import fs from 'node:fs';

import { FlatConfigComposer } from 'eslint-flat-config-utils';

import { astro } from './configs/astro';
import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { react } from './configs/react';
import { solid } from './configs/solidjs';
import { stylistic } from './configs/stylistic';
import { svelte } from './configs/svelte';
import { testingLibrary } from './configs/testing-library';
import { typescript } from './configs/typescript';
import { unicorn } from './configs/unicorn';
import { vitest } from './configs/vitest';
import { vue } from './configs/vue';
import { DEFAULT_ECMA_VERSION } from './constants';
import { hasPackage } from './utils';

export async function defineConfig(options: OptionsConfig): Promise<TypedConfigItem[]> {
  const {
    ecmaVersion = DEFAULT_ECMA_VERSION,
    ignores: ignoreFiles,
    typescript: enableTypeScript = hasPackage('typescript'),
    react: reactFlag,
    astro: enableAstro,
    svelte: enableSvelte,
    solidjs: enableSolidjs,
    vue: enableVue,
    testing: enableTesting,
    overrides = [],
  } = options;

  const configs: Awaitable<TypedConfigItem[]>[] = [];

  configs.push(
    ignores({ files: ignoreFiles }),
    javascript({ ecmaVersion }),
    comments(),
    imports(),
    stylistic(),
    unicorn(),
  );

  const tsconfigPath = (() => {
    if (typeof enableTypeScript !== 'boolean') {
      return enableTypeScript;
    }

    if (fs.existsSync('tsconfig.eslint.json')) {
      return 'tsconfig.eslint.json';
    }

    return 'tsconfig.json';
  })();

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
      solid({
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
    configs.push(
      vitest({
        typescript: Boolean(enableTypeScript),
      }),
    );
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
