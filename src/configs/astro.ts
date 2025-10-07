import type { OptionsAstro, OptionsHasTypescript, TypedConfigItem } from '../types';

import globals from 'globals';
import parserAstro from 'astro-eslint-parser';
import pluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

import { GLOB_ASTRO_FILES, GLOB_ASTRO_JS_FILES, GLOB_ASTRO_TS_FILES } from '../globs';

export function astro({
  typescript,
  overrides,
}: OptionsHasTypescript & OptionsAstro = {}): TypedConfigItem[] {
  const astroJsxA11yConfig = pluginAstro.configs['jsx-a11y-recommended'].find((config) => {
    const pluginKeys = Object.keys(config.plugins ?? {});

    return pluginKeys.includes('jsx-a11y');
  });

  return [
    {
      name: 'astro/setup',
      plugins: {
        astro: pluginAstro,
      },
    },
    {
      name: 'astro/base',
      files: [...GLOB_ASTRO_FILES],
      languageOptions: {
        globals: {
          ...globals.node,
          ...pluginAstro.environments.astro.globals,
        },
        parser: parserAstro,
        sourceType: 'module',
        parserOptions: {
          parser: typescript ? tseslint.parser : undefined,
          extraFileExtensions: ['.astro'],
        },
      },
      processor: typescript ? 'astro/client-side-ts' : 'astro/astro',
    },
    {
      name: 'astro/javascript',
      files: [...GLOB_ASTRO_JS_FILES],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
        sourceType: 'module',
      },
    },
    {
      name: 'astro/typescript',
      files: [...GLOB_ASTRO_TS_FILES],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
        parser: typescript ? tseslint.parser : undefined,
        sourceType: 'module',
        parserOptions: {
          project: null,
        },
      },
    },
    {
      name: 'astro/recommended',
      files: [...GLOB_ASTRO_FILES],
      rules: {
        'astro/missing-client-only-directive-value': 'error',
        'astro/no-conflict-set-directives': 'error',
        'astro/no-deprecated-astro-canonicalurl': 'error',
        'astro/no-deprecated-astro-fetchcontent': 'error',
        'astro/no-deprecated-astro-resolve': 'error',
        'astro/no-deprecated-getentrybyslug': 'error',
        'astro/no-unused-define-vars-in-style': 'error',
        'astro/valid-compile': 'error',
      },
    },
    {
      name: 'astro/jsx-a11y-recommended',
      files: [...GLOB_ASTRO_FILES],
      ...astroJsxA11yConfig,
    },
    {
      name: 'astro/rules/overrides',
      files: [...GLOB_ASTRO_FILES],
      rules: {
        ...overrides,
      },
    },
  ];
}
