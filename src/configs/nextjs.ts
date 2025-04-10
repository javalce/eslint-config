import { type Linter } from 'eslint';

import { JS_FILES, JSX_FILES, SRC_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { hasPackage, lazy } from '../utils';

export async function nextjs(): Promise<TypedConfigItem[]> {
  const [nextjsPlugin, babelParser] = await Promise.all([
    lazy(import('@next/eslint-plugin-next')),
    lazy(import('@babel/eslint-parser')),
  ]);

  const babelOptions = {
    presets: hasPackage('next/babel') ? ['next/babel'] : [],
  };

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
      },
      name: 'next/rules',
    },
  ] satisfies TypedConfigItem[];
}
