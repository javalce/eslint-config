import { URL } from 'node:url';

// @ts-expect-error -- no types available
import babelParser from '@babel/eslint-parser';
import { fixupPluginRules } from '@eslint/compat';
import nextjsPlugin from '@next/eslint-plugin-next';
import { type Linter } from 'eslint';

import { JAVASCRIPT_FILES } from '../constants';
import { type TypedConfigItem } from '../types';

export function nextjs(): TypedConfigItem[] {
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
        '@next/next': fixupPluginRules(nextjsPlugin),
      },
      rules: {
        ...nextjsPlugin.configs.recommended.rules,
      },
      name: 'javalce/nextjs',
    },
    {
      files: JAVASCRIPT_FILES,
      languageOptions: {
        parser: babelParser as Linter.Parser,
        parserOptions: {
          requireConfigFile: false,
          babelOptions,
        },
      },
      name: 'javalce/nextjs/parser',
    },
  ];
}
