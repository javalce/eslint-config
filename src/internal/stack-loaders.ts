import type {
  Awaitable,
  Config,
  OptionsPresetAngular,
  OptionsPresetNext,
  OptionsPresetReact,
  OptionsPresetTanstack,
  OptionsPresetTest,
} from '../types';

import { angular } from '../configs/angular';
import { jest } from '../configs/jest';
import { jsx } from '../configs/jsx';
import { nextjs } from '../configs/nextjs';
import { ngrx } from '../configs/ngrx';
import { react } from '../configs/react';
import { tanstackQuery, tanstackRouter } from '../configs/tanstack';
import { testingLibrary } from '../configs/testing-library';
import { vitest } from '../configs/vitest';
import { isEnabled, resolveSubOptions } from './utils';

/**
 * Load React stack: jsx + react
 * Internal helper used by defineConfig and presetReact
 */
export async function loadReactStack(options: OptionsPresetReact): Promise<Config[]> {
  return Promise.all([
    jsx({ ...resolveSubOptions(options, 'jsx') }),
    react({ ...resolveSubOptions(options, 'react') }),
  ]).then((configs) => configs.flat());
}

/**
 * Load Next.js stack: jsx + react + nextjs
 * Internal helper used by defineConfig and presetNextjs
 */
export async function loadNextjsStack(options: OptionsPresetNext): Promise<Config[]> {
  return Promise.all([
    jsx({ ...resolveSubOptions(options, 'jsx') }),
    react({ ...resolveSubOptions(options, 'react') }),
    nextjs({ ...resolveSubOptions(options, 'next') }),
  ]).then((configs) => configs.flat());
}

/**
 * Load Angular stack: angular + ngrx (ngrx is conditional)
 * Internal helper used by defineConfig and presetAngular
 */
export async function loadAngularStack(options: OptionsPresetAngular): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  configs.push(angular({ ...resolveSubOptions(options, 'angular') }));

  if (isEnabled(options, 'ngrx')) {
    configs.push(ngrx({ ...resolveSubOptions(options, 'ngrx') }));
  }

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}

/**
 * Load Tanstack stack: query and/or router
 * Internal helper used by defineConfig and presetTanstack
 */
export async function loadTanstackStack(options: OptionsPresetTanstack): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  if (isEnabled(options, 'query')) {
    configs.push(tanstackQuery({ ...resolveSubOptions(options, 'query') }));
  }

  if (isEnabled(options, 'router')) {
    configs.push(tanstackRouter({ ...resolveSubOptions(options, 'router') }));
  }

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}

/**
 * Load Test stack: jest or vitest + optional testing-library
 * Requires framework flags (angular, react, svelte, vue) for testingLibrary
 * Internal helper used by defineConfig and presetTest
 */
export async function loadTestStack(
  options: OptionsPresetTest,
  frameworkFlags: {
    angular: boolean;
    react: boolean;
    svelte: boolean;
    vue: boolean;
  },
): Promise<Config[]> {
  const configs: Array<Awaitable<Config[]>> = [];

  if (options.runner === 'jest') {
    configs.push(jest({ overrides: options.overrides }));
  }

  if (options.runner === 'vitest') {
    configs.push(vitest({ typescript: options.typescript, overrides: options.overrides }));
  }

  if (isEnabled(options, 'testingLibrary')) {
    const testingLibraryOptions = resolveSubOptions(options, 'testingLibrary');

    configs.push(
      testingLibrary({
        ...testingLibraryOptions,
        angular: frameworkFlags.angular,
        react: frameworkFlags.react,
        svelte: frameworkFlags.svelte,
        vue: frameworkFlags.vue,
      }),
    );
  }

  return Promise.all(configs.map((c) => Promise.resolve(c))).then((configs) => configs.flat());
}
