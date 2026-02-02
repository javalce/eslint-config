import type { ConfigNames } from './typegen';
import type {
  Awaitable,
  Config,
  OptionsConfig,
  OptionsPresetAngular,
  OptionsPresetAstro,
  OptionsPresetBase,
  OptionsPresetNext,
  OptionsPresetReact,
  OptionsPresetSolid,
  OptionsPresetSvelte,
  OptionsPresetTest,
  OptionsPresetTypescript,
  OptionsPresetVue,
} from './types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import { angular } from './configs/angular';
import { astro } from './configs/astro';
import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { jsx } from './configs/jsx';
import { nextjs } from './configs/nextjs';
import { ngrx } from './configs/ngrx';
import { node } from './configs/node';
import { perfectionist } from './configs/perfectionist';
import { react } from './configs/react';
import { solid } from './configs/solidjs';
import { stylistic } from './configs/stylistic';
import { svelte } from './configs/svelte';
import { tanstackQuery, tanstackRouter } from './configs/tanstack';
import { testingLibrary } from './configs/testing-library';
import { typescript } from './configs/typescript';
import { unicorn } from './configs/unicorn';
import { vitest } from './configs/vitest';
import { vue } from './configs/vue';

function presetBase(options: OptionsPresetBase = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    ignores({ files: options.ignores }),
    javascript(resolveSubOptions(options, 'js')),
    comments(resolveSubOptions(options, 'comments')),
    imports(resolveSubOptions(options, 'import')),
    perfectionist(resolveSubOptions(options, 'perfectionist')),
    stylistic(resolveSubOptions(options, 'stylistic')),
    unicorn(resolveSubOptions(options, 'unicorn')),
    node(resolveSubOptions(options, 'node')),
  ).toConfigs();
}

function presetTypescript(options: OptionsPresetTypescript = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    typescript({
      ...resolveSubOptions(options, 'ts'),
      type: options.type ?? 'app',
    }),
  ).toConfigs();
}

function presetAngular(options: OptionsPresetAngular = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    angular({
      ...resolveSubOptions(options, 'angular'),
    }),
    ngrx({
      ...resolveSubOptions(options, 'ngrx'),
    }),
  ).toConfigs();
}

function presetReact(options: OptionsPresetReact = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    jsx({
      ...resolveSubOptions(options, 'jsx'),
    }),
    react({
      ...resolveSubOptions(options, 'react'),
    }),
  ).toConfigs();
}

function presetNextjs(options: OptionsPresetNext = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    jsx({
      ...resolveSubOptions(options, 'jsx'),
    }),
    react({
      ...resolveSubOptions(options, 'react'),
    }),
    nextjs({
      ...resolveSubOptions(options, 'next'),
    }),
  ).toConfigs();
}

function presetAstro(options: OptionsPresetAstro = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    astro({
      ...resolveSubOptions(options, 'astro'),
      typescript: Boolean(options.typescript),
    }),
  ).toConfigs();
}

function presetSvelte(options: OptionsPresetSvelte = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    svelte({
      ...resolveSubOptions(options, 'svelte'),
      typescript: Boolean(options.typescript),
    }),
  ).toConfigs();
}

function presetSolid(options: OptionsPresetSolid = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    jsx({
      ...resolveSubOptions(options, 'jsx'),
    }),
    solid({
      ...resolveSubOptions(options, 'solid'),
      typescript: Boolean(options.typescript),
    }),
  ).toConfigs();
}

function presetVue(options: OptionsPresetVue = {}): Promise<Config[]> {
  return new FlatConfigComposer<Config, ConfigNames>(
    vue({
      ...resolveSubOptions(options, 'vue'),
      typescript: Boolean(options.typescript),
    }),
  ).toConfigs();
}

function presetTest(options: OptionsPresetTest): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  if (options.framework === 'jest') {
    configs.push(
      jest({
        overrides: options.overrides,
      }),
    );
  }

  if (options.framework === 'vitest') {
    configs.push(
      vitest({
        typescript: options.typescript,
        overrides: options.overrides,
      }),
    );
  }

  if (isEnabled(options, 'testingLibrary')) {
    configs.push(testingLibrary(options.testingLibrary));
  }

  return new FlatConfigComposer<Config, ConfigNames>(...configs).toConfigs();
}

/**
 * Presets available in eslint-config.
 */
export const presets = {
  base: presetBase,
  typescript: presetTypescript,
  angular: presetAngular,
  react: presetReact,
  nextjs: presetNextjs,
  astro: presetAstro,
  svelte: presetSvelte,
  solid: presetSolid,
  vue: presetVue,
  test: presetTest,
};

/**
 * Generates a custom ESLint configuration based on the provided options.
 *
 * @param {OptionsConfig} options - Options to customize the generated configuration.
 *
 * @returns {Promise<Config[]>} ESLint configuration ready to be used.
 */
export async function defineConfig(
  options: OptionsConfig = {},
  overrides: Config[] = [],
): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  const projectType = options.type ?? 'app';

  const tsEnabled = isEnabled(options, 'ts', isPackageExists('typescript'));
  const angularEnabled = isEnabled(options, 'angular');
  const ngrxEnabled = isEnabled(options, 'ngrx');
  const reactEnabled = isEnabled(options, 'react');
  const jsxEnabled = isEnabled(options, 'jsx');
  const nextEnabled = isEnabled(options, 'next');
  const vueEnabled = isEnabled(options, 'vue');
  const svelteEnabled = isEnabled(options, 'svelte');
  const solidEnabled = isEnabled(options, 'solid');
  const astroEnabled = isEnabled(options, 'astro');
  const tanstackEnabled = isEnabled(options, 'tanstack');
  const testEnabled = isEnabled(options, 'test');

  configs.push(presetBase(options));

  if (tsEnabled) {
    configs.push(
      typescript({
        ...resolveSubOptions(options, 'ts'),
        type: projectType,
      }),
    );
  }

  if (jsxEnabled) {
    configs.push(
      jsx({
        ...resolveSubOptions(options, 'jsx'),
      }),
    );
  }

  if (angularEnabled) {
    configs.push(
      angular({
        ...resolveSubOptions(options, 'angular'),
      }),
    );
  }

  if (ngrxEnabled) {
    configs.push(
      ngrx({
        ...resolveSubOptions(options, 'ngrx'),
      }),
    );
  }

  if (reactEnabled) {
    configs.push(
      react({
        ...resolveSubOptions(options, 'react'),
      }),
    );
  }

  if (nextEnabled) {
    configs.push(
      nextjs({
        ...resolveSubOptions(options, 'next'),
      }),
    );
  }

  if (astroEnabled) {
    configs.push(
      astro({
        typescript: tsEnabled,
        ...resolveSubOptions(options, 'astro'),
      }),
    );
  }

  if (svelteEnabled) {
    configs.push(
      svelte({
        ...resolveSubOptions(options, 'svelte'),
        typescript: tsEnabled,
      }),
    );
  }

  if (solidEnabled) {
    configs.push(
      solid({
        ...resolveSubOptions(options, 'solid'),
        typescript: tsEnabled,
      }),
    );
  }

  if (vueEnabled) {
    configs.push(
      vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: tsEnabled,
      }),
    );
  }

  if (tanstackEnabled) {
    const tanstackOptions = resolveSubOptions(options, 'tanstack');
    const queryEnabled = isEnabled(tanstackOptions, 'query');
    const routerEnabled = isEnabled(tanstackOptions, 'router');

    if (queryEnabled) {
      configs.push(tanstackQuery());
    }

    if (routerEnabled) {
      configs.push(tanstackRouter());
    }
  }

  if (testEnabled) {
    const testOptions = resolveSubOptions(options, 'test');

    const testingLibraryOptions = resolveSubOptions(testOptions, 'testingLibrary');

    configs.push(
      presetTest({
        ...testOptions,
        testingLibrary: isEnabled(testOptions, 'testingLibrary')
          ? {
              ...testingLibraryOptions,
              angular: angularEnabled,
              react: reactEnabled,
              svelte: svelteEnabled,
              vue: vueEnabled,
            }
          : false,
      }),
    );
  }

  let composer = new FlatConfigComposer<Config, ConfigNames>();

  composer = composer.append(...configs, ...overrides);

  return composer.toConfigs();
}

export async function mergeConfig(
  ...configs: Array<Awaitable<Config | Config[]>>
): Promise<Config[]> {
  const resolved = await Promise.all(configs);

  return resolved.flat();
}

type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

function resolveSubOptions<T, K extends keyof T>(options: T, key: K): ResolvedOptions<T[K]> {
  return typeof options[key] === 'boolean'
    ? ({} as ResolvedOptions<T[K]>)
    : ((options[key] ?? {}) as ResolvedOptions<T[K]>);
}

function isEnabled<T>(options: T, key: keyof T, defaultValue = false): boolean {
  const option = options[key];

  if (option === undefined) return defaultValue;
  if (typeof option === 'boolean') return option;

  return true;
}
