import type { Linter } from 'eslint';

import globals from 'globals';

import { ASTRO_FILES, ASTRO_JS_FILES, ASTRO_TS_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function astro({ typescript }: { typescript: boolean }): Promise<TypedConfigItem[]> {
  ensureInstalled('eslint-plugin-astro', 'astro-eslint-parser');

  const [pluginAstro, parserAstro, tseslint] = await Promise.all([
    lazy(import('eslint-plugin-astro')),
    lazy(import('astro-eslint-parser')),
    lazy(import('typescript-eslint')),
  ]);

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
      files: [ASTRO_FILES],
      languageOptions: {
        globals: pluginAstro.environments.astro.globals,
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
      files: [...ASTRO_JS_FILES],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
        sourceType: 'module',
      },
    },
    {
      name: 'astro/typescript',
      files: [...ASTRO_TS_FILES],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
        parser: tseslint.parser as Linter.Parser,
        sourceType: 'module',
        parserOptions: {
          project: null,
        },
      },
    },
    {
      name: 'astro/recommended',
      files: [ASTRO_FILES],
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
      files: [ASTRO_FILES],
      ...astroJsxA11yConfig,
    },
  ] satisfies TypedConfigItem[];
}
