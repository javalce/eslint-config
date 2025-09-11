import type { Awaitable, ConfigNames, OptionsConfig, TypedConfigItem } from './types';

import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import { angular } from './configs/angular';
import { astro } from './configs/astro';
import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { jest } from './configs/jest';
import { nextjs } from './configs/nextjs';
import { ngrx } from './configs/ngrx';
import { react } from './configs/react';
import { solid } from './configs/solidjs';
import { stylistic } from './configs/stylistic';
import { svelte } from './configs/svelte';
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
 * @returns {Promise<TypedConfigItem[]>} ESLint configuration ready to be used.
 */
export async function defineConfig(options: OptionsConfig = {}): Promise<TypedConfigItem[]> {
  const {
    ignores: ignoreFiles,
    typescript: enableTypeScript = isPackageExists('typescript'),
    angular: enableAngular,
    ngrx: enableNgrx,
    react: enableReact,
    next: enableNext,
    astro: enableAstro,
    svelte: enableSvelte,
    solid: enableSolid,
    vue: enableVue,
    test: enableTesting,
    type: projectType = 'app',
    extends: additionalConfig = [],
  } = options;

  const configs: Array<Awaitable<TypedConfigItem[]>> = [];

  configs.push(
    ignores({ files: ignoreFiles }),
    javascript(resolveSubOptions(options, 'javascript')),
    comments(resolveSubOptions(options, 'comments')),
    imports({
      typescript: Boolean(enableTypeScript),
      ...resolveSubOptions(options, 'import'),
    }),
    stylistic(resolveSubOptions(options, 'stylistic')),
    unicorn(resolveSubOptions(options, 'unicorn')),
  );

  if (enableTypeScript) {
    configs.push(
      typescript({
        pathAliases: options.import?.pathAliases,
        type: projectType,
        ...resolveSubOptions(options, 'typescript'),
      }),
    );
  }

  if (enableAngular) {
    configs.push(angular(resolveSubOptions(options, 'angular')));
  }

  if (enableNgrx) {
    configs.push(ngrx(resolveSubOptions(options, 'ngrx')));
  }

  if (enableReact) {
    configs.push(react(resolveSubOptions(options, 'react')));
  }

  if (enableNext) {
    configs.push(nextjs(resolveSubOptions(options, 'next')));
  }

  if (enableAstro) {
    const newLocal = Boolean(enableTypeScript);

    configs.push(
      astro({
        typescript: newLocal,
        ...resolveSubOptions(options, 'astro'),
      }),
    );
  }

  if (enableSvelte) {
    configs.push(
      svelte({
        typescript: Boolean(enableTypeScript),
        ...resolveSubOptions(options, 'svelte'),
      }),
    );
  }

  if (enableSolid) {
    configs.push(
      solid({
        typescript: Boolean(enableTypeScript),
        ...resolveSubOptions(options, 'solid'),
      }),
    );
  }

  if (enableVue) {
    configs.push(
      vue({
        typescript: Boolean(enableTypeScript),
        ...resolveSubOptions(options, 'vue'),
      }),
    );
  }

  if (enableTesting) {
    const testOptions = resolveSubOptions(options, 'test');
    const {
      framework: testingFramework,
      testingLibrary: enableTestingLibrary,
      overrides,
    } = testOptions;
    const enableJest = testingFramework === 'jest';
    const enableVitest = testingFramework === 'vitest';

    if (enableJest) {
      configs.push(
        jest({
          overrides,
        }),
      );
    }

    if (enableVitest) {
      configs.push(
        vitest({
          typescript: Boolean(enableTypeScript),
          ...overrides,
        }),
      );
    }

    if (enableTestingLibrary) {
      configs.push(
        testingLibrary({
          angular: Boolean(enableAngular),
          react: Boolean(enableReact),
          svelte: Boolean(enableSvelte),
          vue: Boolean(enableVue),
          ...resolveSubOptions(testOptions, 'testingLibrary'),
        }),
      );
    }
  }

  let composer = new FlatConfigComposer<TypedConfigItem, ConfigNames>();

  composer = composer.append(...configs, ...additionalConfig);

  return composer.toConfigs();
}

type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

function resolveSubOptions<T, K extends keyof T>(options: T, key: K): ResolvedOptions<T[K]> {
  return typeof options[key] === 'boolean'
    ? ({} as ResolvedOptions<T[K]>)
    : (options[key] as ResolvedOptions<T[K]>);
}
