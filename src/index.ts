import type {
  OptionsConfig,
  OptionsPathAliases,
  OptionsTsconfigPath,
  TypedConfigItem,
} from './types';

import { isPackageExists } from 'local-pkg';

import { comments } from './configs/comments';
import { ignores } from './configs/ignores';
import { imports } from './configs/imports';
import { javascript } from './configs/javascript';
import { stylistic } from './configs/stylistic';
import { unicorn } from './configs/unicorn';

/**
 * Generates a custom ESLint configuration based on the provided options.
 *
 * @param {OptionsConfig} options - Options to customize the generated configuration.
 *
 * @returns {Promise<TypedConfigItem[]>} ESLint configuration ready to be used.
 */
export async function defineConfig(options: OptionsConfig = {}): Promise<TypedConfigItem[]> {
  const configs: TypedConfigItem[][] = [];

  const projectType = options.type ?? 'app';

  const tsconfigPath = (resolveSubOptions(options, 'typescript') as OptionsTsconfigPath | undefined)
    ?.tsconfigPath;
  const pathAliases = (resolveSubOptions(options, 'import') as OptionsPathAliases | undefined)
    ?.pathAliases;

  const tsEnabled = isEnabled(options, 'typescript', isPackageExists('typescript'));
  const angularEnabled = isEnabled(options, 'angular');
  const ngrxEnabled = isEnabled(options, 'ngrx');
  const reactEnabled = isEnabled(options, 'react');
  const nextEnabled = isEnabled(options, 'next');
  const vueEnabled = isEnabled(options, 'vue');
  const svelteEnabled = isEnabled(options, 'svelte');
  const solidEnabled = isEnabled(options, 'solid');
  const astroEnabled = isEnabled(options, 'astro');
  const testEnabled = isEnabled(options, 'test');

  configs.push(
    ignores({ files: options.ignores }),
    javascript(resolveSubOptions(options, 'javascript')),
    comments(resolveSubOptions(options, 'comments')),
    imports({
      ...resolveSubOptions(options, 'import'),
      typescript: tsEnabled,
      tsconfigPath,
    }),
    stylistic(resolveSubOptions(options, 'stylistic')),
    unicorn(resolveSubOptions(options, 'unicorn')),
  );

  if (tsEnabled) {
    const { typescript } = await import('./configs/typescript');

    configs.push(
      typescript({
        ...resolveSubOptions(options, 'typescript'),
        pathAliases,
        type: projectType,
      }),
    );
  }

  if (angularEnabled) {
    const { angular } = await import('./configs/angular');

    configs.push(
      angular({
        ...resolveSubOptions(options, 'angular'),
      }),
    );
  }

  if (ngrxEnabled) {
    const { ngrx } = await import('./configs/ngrx');

    configs.push(
      ngrx({
        ...resolveSubOptions(options, 'ngrx'),
      }),
    );
  }

  if (reactEnabled) {
    const { react } = await import('./configs/react');

    configs.push(
      react({
        ...resolveSubOptions(options, 'react'),
      }),
    );
  }

  if (nextEnabled) {
    const { nextjs } = await import('./configs/nextjs');

    configs.push(
      nextjs({
        ...resolveSubOptions(options, 'next'),
      }),
    );
  }

  if (astroEnabled) {
    const { astro } = await import('./configs/astro');

    configs.push(
      astro({
        typescript: tsEnabled,
        ...resolveSubOptions(options, 'astro'),
      }),
    );
  }

  if (svelteEnabled) {
    const { svelte } = await import('./configs/svelte');

    configs.push(
      svelte({
        ...resolveSubOptions(options, 'svelte'),
        typescript: tsEnabled,
      }),
    );
  }

  if (solidEnabled) {
    const { solid } = await import('./configs/solidjs');

    configs.push(
      solid({
        ...resolveSubOptions(options, 'solid'),
        typescript: tsEnabled,
      }),
    );
  }

  if (vueEnabled) {
    const { vue } = await import('./configs/vue');

    configs.push(
      vue({
        ...resolveSubOptions(options, 'vue'),
        typescript: tsEnabled,
      }),
    );
  }

  if (testEnabled) {
    const testOptions = resolveSubOptions(options, 'test');

    const testingFramework = testOptions.framework;
    const enableJest = testingFramework === 'jest';
    const enableVitest = testingFramework === 'vitest';

    const testingLibraryEnabled = Boolean(testOptions.testingLibrary);

    if (enableJest) {
      const { jest } = await import('./configs/jest');

      configs.push(
        jest({
          overrides: testOptions.overrides,
        }),
      );
    }

    if (enableVitest) {
      const { vitest } = await import('./configs/vitest');

      configs.push(
        vitest({
          typescript: tsEnabled,
          overrides: testOptions.overrides,
        }),
      );
    }

    if (testingLibraryEnabled) {
      const { testingLibrary } = await import('./configs/testing-library');

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

  const additionalConfig = (options.extends ?? []) as TypedConfigItem[];

  return [...configs.flat(), ...additionalConfig];
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
