import type { Linter } from 'eslint';
import type { OptionsNext, TypedConfigItem } from '../types';

import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import babelParser from '@babel/eslint-parser';
import nextjsPlugin from '@next/eslint-plugin-next';

import { GLOB_JS_FILES, GLOB_JSX_FILES, GLOB_SRC_FILES } from '../globs';

const require = createRequire(process.cwd());

export function nextjs({ overrides }: OptionsNext = {}): TypedConfigItem[] {
  const rootPath = process.cwd();

  const isAppDir =
    fs.existsSync(path.resolve(rootPath, 'src', 'app')) ||
    fs.existsSync(path.resolve(rootPath, 'app'));

  const babelOptions = {
    presets: (() => {
      try {
        require.resolve('next/babel');

        return ['next/babel'];
      } catch {
        return [];
      }
    })(),
  };

  const defaultExportRuleFiles = (() => {
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

      return [`**/app/**/{${filenames.join(',')}}.{js,jsx,tsx}`];
    }

    return ['**/pages/**/*.[jt]s?(x)'];
  })();

  return [
    {
      plugins: {
        '@next/next': nextjsPlugin,
      },
      name: 'next/setup',
    },
    {
      files: [GLOB_JS_FILES, GLOB_JSX_FILES],
      languageOptions: {
        parser: babelParser,
        parserOptions: {
          requireConfigFile: false,
          babelOptions,
        },
      },
      name: 'next/parser',
    },
    {
      files: [GLOB_SRC_FILES],
      rules: {
        ...(nextjsPlugin.configs.recommended.rules as Linter.RulesRecord),
        ...(nextjsPlugin.configs['core-web-vitals'].rules as Linter.RulesRecord),
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
