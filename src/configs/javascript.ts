import type { TypedFlatConfigItem } from '../types';

// @ts-expect-error -- no types
import babelEslintParser from '@babel/eslint-parser';
import js from '@eslint/js';
import { mergeConfigs } from 'eslint-flat-config-utils';
import globals from 'globals';

import bestPracticeConfig from '../rules/best-practice';
import eslintCommentsConfig from '../rules/comments';
import es6Config from '../rules/es6';
import importConfig from '../rules/import';
import posibleErrorsConfig from '../rules/possible-errors';
import stylisticConfig from '../rules/stylistic';
import unicornConfig from '../rules/unicorn';
import variablesConfig from '../rules/variables';
import { ECMA_VERSION, JAVASCRIPT_FILES } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/require-await -- top-level await
export async function javascript(): Promise<TypedFlatConfigItem[]> {
  return [
    mergeConfigs(
      js.configs.recommended as TypedFlatConfigItem,
      bestPracticeConfig,
      importConfig,
      eslintCommentsConfig,
      es6Config,
      posibleErrorsConfig,
      stylisticConfig,
      unicornConfig,
      variablesConfig,
      {
        ignores: ['!.*.js'],
        linterOptions: {
          reportUnusedDisableDirectives: true,
        },
        languageOptions: {
          ecmaVersion: ECMA_VERSION,
          sourceType: 'module',

          globals: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions -- no types
            ...globals[`es${ECMA_VERSION}`],
            ...globals.browser,
            ...globals.node,
          },
        },
      },
    ),
    {
      files: JAVASCRIPT_FILES,
      languageOptions: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- no types
        parser: babelEslintParser,
        parserOptions: {
          requireConfigFile: false,
        },
      },
    },
  ];
}
