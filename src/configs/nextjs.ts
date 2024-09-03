// @ts-expect-error -- no types available
import babelParser from '@babel/eslint-parser';
import { fixupPluginRules } from '@eslint/compat';
import nextjsPlugin from '@next/eslint-plugin-next';

import { JAVASCRIPT_FILES } from '../constants';
import { type TypedConfigItem } from '../types';

export async function nextjs(): Promise<TypedConfigItem[]> {
  const babelOptions = {
    presets: (() => {
      try {
        // eslint-disable-next-line no-new -- dynamic import
        new URL('next/babel', import.meta.url);

        return ['next/babel'];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars -- ignore
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
