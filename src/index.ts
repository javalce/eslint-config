import type {
  Awaitable,
  Config,
  OptionsAngular,
  OptionsConfig,
  OptionsJSX,
  OptionsNext,
  OptionsNgrx,
  OptionsPresetAstro,
  OptionsPresetBase,
  OptionsPresetSvelte,
  OptionsPresetTanstack,
  OptionsPresetTest,
  OptionsPresetTypescript,
  OptionsPresetVue,
  OptionsReact,
  OptionsTypescript,
} from './types';

import { angular } from './configs/angular';
import { astro } from './configs/astro';
import { comments } from './configs/comments';
import { e18e } from './configs/e18e';
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
import { stylistic } from './configs/stylistic';
import { svelte } from './configs/svelte';
import { tanstackQuery, tanstackRouter } from './configs/tanstack';
import { testingLibrary } from './configs/testing-library';
import { typescript } from './configs/typescript';
import { unicorn } from './configs/unicorn';
import { vitest } from './configs/vitest';
import { vue } from './configs/vue';
import { prepareTsInfo, resolveFrameworkFlags } from './internal/resolvers';
import { isEnabled, resolveSubOptions } from './internal/utils';

export type * from './types';

async function presetBase(options: OptionsPresetBase = {}): Promise<Config[]> {
  return Promise.resolve(
    [
      ignores({ files: options.ignores }),
      javascript(resolveSubOptions(options, 'js')),
      comments(resolveSubOptions(options, 'comments')),
      imports({
        ...resolveSubOptions(options, 'import'),
        ...options.tsInfo,
      }),
      perfectionist(resolveSubOptions(options, 'perfectionist')),
      stylistic(resolveSubOptions(options, 'stylistic')),
      unicorn(resolveSubOptions(options, 'unicorn')),
      node(resolveSubOptions(options, 'node')),
      e18e({
        ...resolveSubOptions(options, 'e18e'),
        type: options.type,
      }),
    ].flat(),
  );
}

async function presetTypescript(options: OptionsPresetTypescript = {}): Promise<Config[]> {
  return Promise.resolve(
    typescript({
      ...options,
      type: options.type ?? 'app',
    }),
  );
}

async function presetJsx(options: OptionsJSX = {}): Promise<Config[]> {
  return jsx(options);
}

async function presetReact(options: OptionsReact = {}): Promise<Config[]> {
  return react(options);
}

async function presetNextjs(options: OptionsNext = {}): Promise<Config[]> {
  return nextjs(options);
}

async function presetAngular(options: OptionsAngular = {}): Promise<Config[]> {
  return angular(options);
}

async function presetNgrx(options: OptionsNgrx = {}): Promise<Config[]> {
  return ngrx(options);
}

async function presetAstro(options: OptionsPresetAstro = {}): Promise<Config[]> {
  return Promise.resolve(
    astro({
      ...resolveSubOptions(options, 'astro'),
      typescript: options.typescript,
      tsconfigPath: options.tsconfigPath,
    }),
  );
}

async function presetSvelte(options: OptionsPresetSvelte = {}): Promise<Config[]> {
  return Promise.resolve(
    svelte({
      ...resolveSubOptions(options, 'svelte'),
      typescript: options.typescript,
    }),
  );
}

async function presetVue(options: OptionsPresetVue = {}): Promise<Config[]> {
  return Promise.resolve(
    vue({
      ...resolveSubOptions(options, 'vue'),
      typescript: options.typescript,
    }),
  );
}

async function presetTanstack(options: OptionsPresetTanstack = {}): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  if (isEnabled(options, 'query')) {
    configs.push(tanstackQuery({ ...resolveSubOptions(options, 'query') }));
  }

  if (isEnabled(options, 'router')) {
    configs.push(tanstackRouter({ ...resolveSubOptions(options, 'router') }));
  }

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}

async function presetTest(options: OptionsPresetTest): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  if (options.runner === 'jest') {
    configs.push(jest({ overrides: options.overrides }));
  }

  if (options.runner === 'vitest') {
    configs.push(vitest({ typescript: options.typescript, overrides: options.overrides }));
  }

  if (isEnabled(options, 'testingLibrary')) {
    configs.push(
      testingLibrary({
        ...resolveSubOptions(options, 'testingLibrary'),
      }),
    );
  }

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}

/**
 * Presets available in eslint-config.
 */
export const presets = {
  base: presetBase,
  typescript: presetTypescript,
  jsx: presetJsx,
  react: presetReact,
  nextjs: presetNextjs,
  angular: presetAngular,
  ngrx: presetNgrx,
  astro: presetAstro,
  svelte: presetSvelte,
  vue: presetVue,
  tanstack: presetTanstack,
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

  const flags = resolveFrameworkFlags(options);
  const tsInfo = prepareTsInfo(options, flags.ts);
  const tsOptions = resolveSubOptions(options, 'ts') as OptionsTypescript | undefined;
  const projectType = flags.projectType;

  configs.push(
    presetBase({
      ...options,
      tsInfo,
      type: projectType,
    }),
  );

  if (flags.ts) {
    configs.push(
      presetTypescript({
        ...resolveSubOptions(options, 'ts'),
        type: projectType,
      }),
    );
  }

  if (flags.jsx) {
    configs.push(presetJsx({ ...resolveSubOptions(options, 'jsx') }));
  }

  if (flags.react) {
    configs.push(presetReact({ ...resolveSubOptions(options, 'react') }));
  }

  if (flags.next) {
    configs.push(presetNextjs({ ...resolveSubOptions(options, 'next') }));
  }

  if (flags.angular) {
    configs.push(presetAngular({ ...resolveSubOptions(options, 'angular') }));
  }

  if (flags.ngrx) {
    configs.push(presetNgrx({ ...resolveSubOptions(options, 'ngrx') }));
  }

  if (flags.astro) {
    configs.push(
      presetAstro({
        typescript: flags.ts,
        tsconfigPath: tsOptions?.tsconfigPath,
        ...resolveSubOptions(options, 'astro'),
      }),
    );
  }

  if (flags.svelte) {
    configs.push(
      presetSvelte({
        ...resolveSubOptions(options, 'svelte'),
        typescript: flags.ts,
      }),
    );
  }

  if (flags.vue) {
    configs.push(
      presetVue({
        ...resolveSubOptions(options, 'vue'),
        typescript: flags.ts,
      }),
    );
  }

  if (flags.tanstack) {
    configs.push(presetTanstack({ ...resolveSubOptions(options, 'tanstack') }));
  }

  if (flags.test) {
    const testOptions = resolveSubOptions(options, 'test');
    const testingLibraryOptions = resolveSubOptions(testOptions, 'testingLibrary');

    configs.push(
      presetTest({
        ...testOptions,
        testingLibrary: isEnabled(testOptions, 'testingLibrary')
          ? {
              ...testingLibraryOptions,
              angular: flags.angular,
              react: flags.react,
              svelte: flags.svelte,
              vue: flags.vue,
            }
          : false,
      }),
    );
  }

  configs.push(overrides);

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}

export async function mergeConfig(
  ...configs: Array<Awaitable<Config | Config[]>>
): Promise<Config[]> {
  const resolved = await Promise.all(configs.map((c) => Promise.resolve(c)));

  return resolved.flat();
}
