import { SVELTE_FILES } from '../constants';
import { type OptionsSvelte, type OptionsHasTypescript, type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function svelte({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsSvelte = {}): Promise<TypedConfigItem[]> {
  ensureInstalled('eslint-plugin-svelte', 'svelte-eslint-parser');

  const [eslintPluginSvelte, svelteParser] = await Promise.all([
    lazy(import('eslint-plugin-svelte')),
    lazy(import('svelte-eslint-parser')),
  ]);

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
      files: [SVELTE_FILES],
      languageOptions: {
        parser: svelteParser,
        parserOptions: {
          extraFileExtensions: ['.svelte'],
          parser: typescript ? (await lazy(import('typescript-eslint'))).parser : null,
        },
      },
      name: 'svelte/rules',
      rules: {
        ...recommendedRules.rules,
      },
    },
    {
      name: 'svelte/rules/overrides',
      files: [SVELTE_FILES],
      rules: {
        ...overrides,
      },
    },
  ];
}
