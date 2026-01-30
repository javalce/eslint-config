import type { Linter } from 'eslint';

import type { Config, OptionsNext } from '../types';

import { GLOB_JS_FILES, GLOB_JSX_FILES, GLOB_SRC_FILES } from '../globs';
import { ensureInstalled, requireModule, resolveDefaultExport } from '../utils';

export async function nextjs({ overrides }: OptionsNext = {}): Promise<Config[]> {
  ensureInstalled(['@next/eslint-plugin-next']);

  const pluginNext = await resolveDefaultExport(import('@next/eslint-plugin-next'));

  const languageOptions = {
    parser: (() => {
      try {
        return requireModule('next/dist/compiled/babel/eslint-parser') as Linter.Parser;
      } catch {
        return undefined;
      }
    })(),
    parserOptions: {
      requireConfigFile: false,
      presets: (() => {
        try {
          requireModule.resolve('next/babel');

          return ['next/babel'];
        } catch {
          return [];
        }
      })(),
    },
  } satisfies Linter.LanguageOptions;

  return [
    {
      plugins: {
        '@next/next': pluginNext,
      },
      name: 'next/setup',
    },
    {
      files: [GLOB_JS_FILES, GLOB_JSX_FILES],
      languageOptions,
      name: 'next/parser/javascript',
    },
    {
      files: [GLOB_SRC_FILES],
      rules: {
        ...(pluginNext.configs.recommended.rules as Linter.RulesRecord),
        ...(pluginNext.configs['core-web-vitals'].rules as Linter.RulesRecord),
      },
      name: 'next/rules',
    },
    {
      files: [GLOB_SRC_FILES],
      rules: {
        ...overrides,
      },
      name: 'next/rules/overrides',
    },
  ] satisfies Config[];
}
