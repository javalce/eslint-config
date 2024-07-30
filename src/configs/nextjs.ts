import { join } from 'node:path';

// @ts-expect-error -- no types
import babelParser from '@babel/eslint-parser';
import { fixupPluginRules } from '@eslint/compat';
import nextjsPlugin from '@next/eslint-plugin-next';

import { type TypedFlatConfigItem } from 'src/types';
import { JAVASCRIPT_FILES } from 'src/utils/constants';

export async function nextjs(): Promise<TypedFlatConfigItem[]> {
  const babelOptions = {
    presets: (() => {
      try {
        join(process.cwd(), 'node_modules', 'next/babel');

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
      rules: nextjsPlugin.configs.recommended.rules,
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
    },
  ];
}
