// @ts-ignore
import babelEslintParser from '@babel/eslint-parser';
import js from '@eslint/js';
import globals from 'globals';
import bestPracticeConfig from '../rules/best-practice';
import eslintCommentsConfig from '../rules/comments';
import es6Config from '../rules/es6';
import importConfig from '../rules/import';
import posibleErrorsConfig from '../rules/possible-errors';
import stylisticConfig from '../rules/stylistic';
import unicornConfig from '../rules/unicorn';
import variablesConfig from '../rules/variables';
import type { TypedFlatConfigItem } from '../types';
import { ECMA_VERSION, JAVASCRIPT_FILES } from '../utils/constants';

export async function javascript(): Promise<TypedFlatConfigItem[]> {
  return [
    js.configs.recommended,
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
          ...globals[`es${ECMA_VERSION}`],
          ...globals.browser,
          ...globals.node,
        },
      },
    },
    {
      files: JAVASCRIPT_FILES,
      languageOptions: {
        parser: babelEslintParser,
        parserOptions: {
          requireConfigFile: false,
        },
      },
    },
  ];
}
