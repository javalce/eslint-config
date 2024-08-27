// @ts-expect-error -- no types available
import babelParser from '@babel/eslint-parser';
import { fixupPluginRules } from '@eslint/compat';
import nextjsPlugin from '@next/eslint-plugin-next';

import { type TypedFlatConfigItem } from '../types';
import { JAVASCRIPT_FILES } from '../utils/constants';

export async function nextjs(): Promise<TypedFlatConfigItem[]> {
  const babelOptions = {
    presets: (() => {
      try {
        // eslint-disable-next-line no-new -- dynamic import
        new URL('next/babel', import.meta.url);

        return ['next/babel'];
      } catch (e) {
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
        parser: babelParser,
        parserOptions: {
          requireConfigFile: false,
          babelOptions,
        },
      },
      name: 'javalce/nextjs/parser',
    },
  ];
}
