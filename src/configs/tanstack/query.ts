import type { OptionsTanstackQuery, TypedConfigItem } from '@/types';

import {
  GLOB_JS_FILES,
  GLOB_JSX_FILES,
  GLOB_SVELTE_FILES,
  GLOB_TS_FILES,
  GLOB_TSX_FILES,
  GLOB_VUE_FILES,
} from '@/globs';
import { resolveDefaultExport } from '@/utils';

export async function tanstackQuery({ overrides }: OptionsTanstackQuery = {}): Promise<
  TypedConfigItem[]
> {
  const pluginQuery = await resolveDefaultExport(import('@tanstack/eslint-plugin-query'));
  const files = [
    GLOB_JS_FILES,
    GLOB_JSX_FILES,
    GLOB_TS_FILES,
    GLOB_TSX_FILES,
    GLOB_SVELTE_FILES,
    GLOB_VUE_FILES,
  ];

  return [
    {
      name: 'tanstack/query/setup',
      plugins: {
        '@tanstack/query': pluginQuery,
      },
    },
    {
      files,
      name: 'tanstack/query/rules',
      rules: {
        ...pluginQuery.configs['flat/recommended'].at(-1)?.rules,
      },
    },
    {
      files,
      name: 'tanstack/query/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
