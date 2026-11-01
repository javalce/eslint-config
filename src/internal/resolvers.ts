import type { OptionsConfig, OptionsTypescript } from '../types';

import { isPackageExists } from 'local-pkg';

import { isEnabled, resolveSubOptions } from './utils';

/**
 * Determines which frameworks are enabled in defineConfig
 * Returns an object with boolean flags for decision making
 */
export function resolveFrameworkFlags(options: OptionsConfig): {
  projectType: string;
  ts: boolean;
  jsx: boolean;
  react: boolean;
  next: boolean;
  angular: boolean;
  ngrx: boolean;
  svelte: boolean;
  vue: boolean;
  astro: boolean;
  tanstack: boolean;
  test: boolean;
} {
  return {
    projectType: options.type ?? 'app',
    ts: isEnabled(options, 'ts', isPackageExists('typescript')),
    jsx: isEnabled(options, 'jsx'),
    react: isEnabled(options, 'react'),
    next: isEnabled(options, 'next'),
    angular: isEnabled(options, 'angular'),
    ngrx: isEnabled(options, 'ngrx'),
    svelte: isEnabled(options, 'svelte'),
    vue: isEnabled(options, 'vue'),
    astro: isEnabled(options, 'astro'),
    tanstack: isEnabled(options, 'tanstack'),
    test: isEnabled(options, 'test'),
  };
}

/**
 * Prepares tsInfo to pass to presetBase
 * (necessary for imports to configure correctly)
 */
export function prepareTsInfo(
  options: OptionsConfig,
  tsEnabled: boolean,
): {
  typescript: boolean;
  tsconfigPath: string | undefined;
} {
  const tsOptions = resolveSubOptions(options, 'ts') as OptionsTypescript | undefined;

  return {
    typescript: tsEnabled,
    tsconfigPath: tsOptions?.tsconfigPath,
  };
}
