import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

import { type Linter } from 'eslint';

import { JS_FILES, JSX_FILES, SRC_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

const require = createRequire(process.cwd());

export async function nextjs(): Promise<TypedConfigItem[]> {
  ensureInstalled('@next/eslint-plugin-next');

  const rootPath = process.cwd();

  const isAppDir =
    fs.existsSync(path.resolve(rootPath, 'src', 'app')) ||
    fs.existsSync(path.resolve(rootPath, 'app'));

  const [nextjsPlugin, babelParser] = await Promise.all([
    lazy(import('@next/eslint-plugin-next')),
    lazy(import('@babel/eslint-parser')),
  ]);

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
      files: [JS_FILES, JSX_FILES],
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
      files: [SRC_FILES],
      rules: {
        ...(nextjsPlugin.configs.recommended.rules as Linter.RulesRecord),
        ...(nextjsPlugin.configs['core-web-vitals'].rules as Linter.RulesRecord),
      },
      name: 'next/rules',
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
