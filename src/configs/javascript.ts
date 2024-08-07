import type { TypedFlatConfigItem } from '../types';

import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import * as eslintPluginImport from 'eslint-plugin-import-x';
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
    {
      plugins: {
        '@stylistic': stylistic,
      },
      name: 'stylistic',
    },
    bestPracticeConfig,
    eslintCommentsConfig,
    es6Config,
    importConfig,
    posibleErrorsConfig,
    stylisticConfig,
    unicornConfig,
    variablesConfig,
    {
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
        // Use the default parser (espree, which handles JavaScript and JSX files)
        parser: undefined,
      },
      name: 'javalce/javascript/parser',
    },
  ];
}
