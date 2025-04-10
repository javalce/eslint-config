import { URL } from 'node:url';

import { fixupPluginRules } from '@eslint/compat';
import { type ESLint, type Linter } from 'eslint';

import { JS_FILES, JSX_FILES, SRC_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function nextjs(): Promise<TypedConfigItem[]> {
  const [nextjsPlugin, babelParser] = await Promise.all([
    lazy(import('@next/eslint-plugin-next')),
    lazy(import('@babel/eslint-parser')),
  ]);

  const babelOptions = {
    presets: (() => {
      try {
        // eslint-disable-next-line no-new -- this is a valid use case
        new URL('next/babel', import.meta.url);

        return ['next/babel'];
      } catch {
        return [];
      }
    })(),
  };

  return [
    {
      files: [SRC_FILES],
      plugins: {
        '@next/next': fixupPluginRules(nextjsPlugin as ESLint.Plugin),
      },
      rules: {
        ...(nextjsPlugin.configs.recommended.rules as Linter.RulesRecord),
      },
      name: 'nextjs/rules',
    },
    {
      files: [JS_FILES, JSX_FILES],
      languageOptions: {
        parser: babelParser as Linter.Parser,
        parserOptions: {
          requireConfigFile: false,
          babelOptions,
        },
      },
      name: 'nextjs/parser',
    },
  ] satisfies TypedConfigItem[];
}
