import type { OptionsHasTypescript, OptionsSvelte, TypedConfigItem } from '../types';

import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

import { GLOB_SVELTE_FILES } from '../globs';

export function svelte({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsSvelte = {}): TypedConfigItem[] {
  const recommendedRules = eslintPluginSvelte.configs['flat/recommended'].find(
    (config) => config.name === 'svelte:recommended:rules',
  )!;

  return [
    {
      name: 'svelte/setup',
      plugins: {
        svelte: eslintPluginSvelte,
      },
    },
    {
      files: [GLOB_SVELTE_FILES],
      languageOptions: {
        parser: svelteParser,
        parserOptions: {
          extraFileExtensions: ['.svelte'],
          parser: typescript ? tseslint.parser : null,
        },
      },
      name: 'svelte/rules',
      rules: {
        ...recommendedRules.rules,
      },
    },
    {
      name: 'svelte/rules/overrides',
      files: [GLOB_SVELTE_FILES],
      rules: {
        ...overrides,
      },
    },
  ];
}
