import type { ConfigNames } from './typegen';
import type { Awaitable, Config, OptionsConfig } from './types';

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

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- workaround for deprecated extends property. Will be removed in the future
  const originalExtends = options.extends;

  Object.defineProperty(options, 'extends', {
    get() {
      const message =
        'options.extends passed to defineConfig is deprecated and will be removed in a future release. Please use the second argument of defineConfig instead. Migration guide: https://github.com/javalce/eslint-config#composing-configs';
      const code = 'DEP_ESLINT_CONFIG_EXTENDS';

      if (typeof process !== 'undefined') {
        process.emitWarning(message, {
          type: 'DeprecationWarning',
          code,
          detail: 'https://github.com/javalce/eslint-config#composing-configs',
        });
      } else {
        console.warn(`[Deprecation ${code}] ${message}`);
      }

      return originalExtends;
    },
  });

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

  configs.push(
    ignores({ files: options.ignores }),
    javascript(resolveSubOptions(options, 'js')),
    comments(resolveSubOptions(options, 'comments')),
    imports({
      ...resolveSubOptions(options, 'import'),
      typescript: tsEnabled,
    }),
    perfectionist(resolveSubOptions(options, 'perfectionist')),
    stylistic(resolveSubOptions(options, 'stylistic')),
    unicorn(resolveSubOptions(options, 'unicorn')),
  );

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

    const testingFramework = testOptions.framework;
    const enableJest = testingFramework === 'jest';
    const enableVitest = testingFramework === 'vitest';

    const testingLibraryEnabled = Boolean(testOptions.testingLibrary);

    if (enableJest) {
      configs.push(
        jest({
          overrides: testOptions.overrides,
        }),
      );
    }

    if (enableVitest) {
      configs.push(
        vitest({
          typescript: tsEnabled,
          overrides: testOptions.overrides,
        }),
      );
    }

    if (testingLibraryEnabled) {
      configs.push(
        testingLibrary({
          ...resolveSubOptions(testOptions, 'testingLibrary'),
          angular: angularEnabled,
          react: reactEnabled,
          svelte: svelteEnabled,
          vue: vueEnabled,
        }),
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated -- will be removed in the future
  const additionalConfig = options.extends;

  let composer = new FlatConfigComposer<Config, ConfigNames>();

  composer = composer.append(...configs, ...(additionalConfig ?? []), ...overrides);

  return composer.toConfigs();
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
