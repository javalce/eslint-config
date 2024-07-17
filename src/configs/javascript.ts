import type { TypedFlatConfigItem } from '../types';

// @ts-expect-error -- no types
import babelEslintParser from '@babel/eslint-parser';
import js from '@eslint/js';
import globals from 'globals';
import * as eslintPluginImport from 'eslint-plugin-import-x';

import bestPracticeConfig from '../rules/best-practice';
import eslintCommentsConfig from '../rules/comments';
import es6Config from '../rules/es6';
import importConfig from '../rules/import';
import posibleErrorsConfig from '../rules/possible-errors';
import stylisticConfig from '../rules/stylistic';
import unicornConfig from '../rules/unicorn';
import variablesConfig from '../rules/variables';
import { ECMA_VERSION, JAVASCRIPT_FILES } from '../utils/constants';

import { prettier } from './prettier';

export async function javascript(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ...js.configs.recommended,
      name: 'eslint/recommended',
    } as TypedFlatConfigItem,
    {
      plugins: {
        'import-x': eslintPluginImport,
      },
      name: 'import-x',
    },
    ...(await prettier()),
    bestPracticeConfig,
    eslintCommentsConfig,
    es6Config,
    importConfig,
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
      name: 'javalce/javascript/setup',
    },
    {
      files: JAVASCRIPT_FILES,
      languageOptions: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- no types
        parser: babelEslintParser,
        parserOptions: {
          requireConfigFile: false,
        },
      },
      name: 'javalce/javascript/parser',
    },
  ];
}
