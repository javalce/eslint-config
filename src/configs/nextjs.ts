import type { Linter } from 'eslint';

import type { OptionsNext, TypedConfigItem } from '@/types';

import fs from 'node:fs';
import path from 'node:path';

import { GLOB_JS_FILES, GLOB_JSX_FILES, GLOB_SRC_FILES } from '@/globs';
import { ensureInstalled, requireModule, resolveDefaultExport } from '@/utils';

const rootPath = process.cwd();

export async function nextjs({ overrides }: OptionsNext = {}): Promise<TypedConfigItem[]> {
  ensureInstalled(['@next/eslint-plugin-next']);

  const pluginNext = await resolveDefaultExport(import('@next/eslint-plugin-next'));

  const isAppDir =
    fs.existsSync(path.resolve(rootPath, 'src', 'app')) ||
    fs.existsSync(path.resolve(rootPath, 'app'));

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

  const defaultExportRuleFiles = (() => {
    const middlewareFiles = ['**/middleware.{js,ts}', '**/proxy.{js,ts}'];

    if (isAppDir) {
      const filenames = [
        'layout',
        'page',
        'loading',
        'not-found',
        'error',
        'global-error',
        'template',
        'default',
        'icon',
        'apple-icon',
        'opengraph-image',
        'twitter-image',
        'sitemap',
        'robots',
      ];

      return [`**/app/**/{${filenames.join(',')}}.{js,jsx,tsx}`, ...middlewareFiles];
    }

    return ['**/pages/**/*.[jt]s?(x)', ...middlewareFiles];
  })();

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
    {
      files: defaultExportRuleFiles,
      rules: {
        'import-x/no-default-export': 'off',
      },
      name: 'next/rules/no-default-export',
    },
  ] satisfies TypedConfigItem[];
}
