import type { OptionsTanstackRouter, TypedConfigItem } from '@/types';

import {
  GLOB_JS_FILES,
  GLOB_JSX_FILES,
  GLOB_SVELTE_FILES,
  GLOB_TS_FILES,
  GLOB_TSX_FILES,
  GLOB_VUE_FILES,
} from '@/globs';
import { resolveDefaultExport } from '@/utils';

export async function tanstackRouter({ overrides }: OptionsTanstackRouter = {}): Promise<
  TypedConfigItem[]
> {
  const pluginRouter = await resolveDefaultExport(import('@tanstack/eslint-plugin-router'));
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
      name: 'tanstack/router/setup',
      plugins: {
        '@tanstack/router': pluginRouter,
      },
    },
    {
      files,
      name: 'tanstack/router/rules',
      rules: {
        ...pluginRouter.configs['flat/recommended'].at(-1)?.rules,
      },
    },
    {
      files,
      name: 'tanstack/router/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
