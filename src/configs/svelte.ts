import type { OptionsHasTypescript, OptionsSvelte, TypedConfigItem } from '@/types';

import { GLOB_SVELTE_FILES } from '@/globs';
import { ensureInstalled, resolveDefaultExport } from '@/utils';

export async function svelte({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsSvelte = {}): Promise<TypedConfigItem[]> {
  ensureInstalled(['eslint-plugin-svelte', 'svelte-eslint-parser']);

  const [pluginSvelte, parserSvelte, tseslint] = await Promise.all([
    resolveDefaultExport(import('eslint-plugin-svelte')),
    resolveDefaultExport(import('svelte-eslint-parser')),
    resolveDefaultExport(import('typescript-eslint')),
  ]);

  const recommendedRules = pluginSvelte.configs['flat/recommended'].find(
    (config) => config.name === 'svelte:recommended:rules',
  )!;

  return [
    {
      name: 'svelte/setup',
      plugins: {
        svelte: pluginSvelte,
      },
    },
    {
      files: [GLOB_SVELTE_FILES],
      languageOptions: {
        parser: parserSvelte,
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
