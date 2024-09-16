import { URL } from 'node:url';

// @ts-expect-error -- no types available
import babelParser from '@babel/eslint-parser';
import { fixupPluginRules } from '@eslint/compat';
import { type ESLint, type Linter } from 'eslint';

import { JS_FILES, JSX_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { lazy } from '../utils';

export async function nextjs(): Promise<TypedConfigItem[]> {
  const nextjsPlugin = await lazy(import('@next/eslint-plugin-next'));

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
      plugins: {
        '@next/next': fixupPluginRules(nextjsPlugin as ESLint.Plugin),
      },
      rules: {
        ...(nextjsPlugin.configs.recommended.rules as Linter.RulesRecord),
      },
      name: 'javalce/nextjs',
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
      name: 'javalce/nextjs/parser',
    },
  ] satisfies TypedConfigItem[];
}
