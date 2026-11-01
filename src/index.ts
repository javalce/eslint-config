import type {
  Awaitable,
  Config,
  OptionsConfig,
  OptionsPresetAngular,
  OptionsPresetAstro,
  OptionsPresetBase,
  OptionsPresetNext,
  OptionsPresetReact,
  OptionsPresetSvelte,
  OptionsPresetTanstack,
  OptionsPresetTest,
  OptionsPresetTypescript,
  OptionsPresetVue,
  OptionsTypescript,
} from './types';

import { astro } from './configs/astro';
import { comments } from './configs/comments';
import { e18e } from './configs/e18e';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { ngrx } from './configs/ngrx';
import { node } from './configs/node';
import { perfectionist } from './configs/perfectionist';
import { stylistic } from './configs/stylistic';
import { svelte } from './configs/svelte';
import { typescript } from './configs/typescript';
import { unicorn } from './configs/unicorn';
import { vue } from './configs/vue';
import { prepareTsInfo, resolveFrameworkFlags } from './internal/resolvers';
import {
  loadAngularStack,
  loadNextjsStack,
  loadReactStack,
  loadTanstackStack,
  loadTestStack,
} from './internal/stack-loaders';
import { resolveSubOptions } from './internal/utils';

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

async function presetAngular(options: OptionsPresetAngular = {}): Promise<Config[]> {
  return loadAngularStack(options);
}

async function presetReact(options: OptionsPresetReact = {}): Promise<Config[]> {
  return loadReactStack(options);
}

async function presetNextjs(options: OptionsPresetNext = {}): Promise<Config[]> {
  return loadNextjsStack(options);
}

async function presetAstro(options: OptionsPresetAstro = {}): Promise<Config[]> {
  return Promise.resolve(
    astro({
      ...resolveSubOptions(options, 'astro'),
      typescript: Boolean(options.typescript),
      tsconfigPath: options.tsconfigPath,
    }),
  );
}

async function presetSvelte(options: OptionsPresetSvelte = {}): Promise<Config[]> {
  return Promise.resolve(
    svelte({
      ...resolveSubOptions(options, 'svelte'),
      typescript: Boolean(options.typescript),
    }),
  );
}

async function presetVue(options: OptionsPresetVue = {}): Promise<Config[]> {
  return Promise.resolve(
    vue({
      ...resolveSubOptions(options, 'vue'),
      typescript: Boolean(options.typescript),
    }),
  );
}

async function presetTanstack(options: OptionsPresetTanstack = {}): Promise<Config[]> {
  return loadTanstackStack(options);
}

async function presetTest(options: OptionsPresetTest): Promise<Config[]> {
  return loadTestStack(options, {
    angular: false,
    react: false,
    svelte: false,
    vue: false,
  });
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
  const projectType = flags.projectType as 'app' | 'lib';

  configs.push(
    presetBase({
      ...options,
      tsInfo,
      type: projectType,
    }),
  );

  if (flags.ts) {
    configs.push(
      typescript({
        ...resolveSubOptions(options, 'ts'),
        type: projectType,
      }),
    );
  }

  if (flags.jsx || flags.react) {
    configs.push(
      loadReactStack({
        jsx: resolveSubOptions(options, 'jsx'),
        react: resolveSubOptions(options, 'react'),
      }),
    );
  }

  if (flags.angular) {
    configs.push(
      loadAngularStack({
        angular: resolveSubOptions(options, 'angular'),
        ngrx: resolveSubOptions(options, 'ngrx'),
      }),
    );
  }

  if (flags.ngrx && !flags.angular) {
    configs.push(
      ngrx({
        ...resolveSubOptions(options, 'ngrx'),
      }),
    );
  }

  if (flags.next) {
    configs.push(
      loadNextjsStack({
        jsx: resolveSubOptions(options, 'jsx'),
        react: resolveSubOptions(options, 'react'),
        next: resolveSubOptions(options, 'next'),
      }),
    );
  }

  if (flags.astro) {
    configs.push(
      astro({
        typescript: flags.ts,
        tsconfigPath: tsOptions?.tsconfigPath,
        ...resolveSubOptions(options, 'astro'),
      }),
    );
  }

  if (flags.svelte) {
    configs.push(
      svelte({
        ...resolveSubOptions(options, 'svelte'),
        typescript: flags.ts,
      }),
    );
  }

  if (flags.vue) {
    configs.push(
      vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: flags.ts,
      }),
    );
  }

  if (flags.tanstack) {
    configs.push(loadTanstackStack(resolveSubOptions(options, 'tanstack')));
  }

  if (flags.test) {
    configs.push(
      loadTestStack(resolveSubOptions(options, 'test'), {
        angular: flags.angular,
        react: flags.react,
        svelte: flags.svelte,
        vue: flags.vue,
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
