import type { EcmaVersion, TypedConfigItem } from '../types';

import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import * as eslintPluginImport from 'eslint-plugin-import-x';
import globals from 'globals';

import { CONFIG_FILES, JS_FILES, JSX_FILES } from '../constants';
import bestPracticeConfig from '../rules/best-practice';
import eslintCommentsConfig from '../rules/comments';
import es6Config from '../rules/es6';
import importConfig from '../rules/import';
import posibleErrorsConfig from '../rules/possible-errors';
import stylisticConfig from '../rules/stylistic';
import unicornConfig from '../rules/unicorn';
import variablesConfig from '../rules/variables';

export function javascript({ ecmaVersion }: { ecmaVersion: EcmaVersion }): TypedConfigItem[] {
  return [
    {
      ...js.configs.recommended,
      name: 'javascript/rules',
    } as TypedConfigItem,
    {
      plugins: {
        'import-x': eslintPluginImport,
      },
      name: 'javascript/import/setup',
    },
    {
      plugins: {
        '@stylistic': stylistic,
      },
      name: 'javascript/stylistic/setup',
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
        ecmaVersion,
        sourceType: 'module',
        globals: {
          ...globals[`es${ecmaVersion}`],
          ...globals.browser,
          ...globals.node,
        },
      },
      name: 'javascript/setup',
    },
    {
      files: [JS_FILES, JSX_FILES],
      languageOptions: {
        // Use the default parser (espree, which handles JavaScript and JSX files)
        parser: undefined,
      },
      name: 'javascript/parser',
    },
    {
      files: CONFIG_FILES,
      rules: {
        'import-x/no-default-export': 'off',
      },
      name: 'import/rules/no-default-export',
    },
  ];
}
