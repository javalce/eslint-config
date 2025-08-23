import type { OptionsEcmaVersion, OptionsJavascript, TypedConfigItem } from '../types';

import js from '@eslint/js';
import globals from 'globals';

import { DEFAULT_ECMA_VERSION } from '../constants';
import bestPracticeConfig from '../rules/best-practice';
import es6Config from '../rules/es6';
import posibleErrorsConfig from '../rules/possible-errors';
import variablesConfig from '../rules/variables';

export function javascript({
  ecmaVersion = DEFAULT_ECMA_VERSION,
  overrides,
}: OptionsEcmaVersion & OptionsJavascript = {}): TypedConfigItem[] {
  return [
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
      ...js.configs.recommended,
      name: 'javascript/rules',
    },
    bestPracticeConfig,
    es6Config,
    posibleErrorsConfig,
    variablesConfig,
    {
      name: 'javascript/rules/overrides',
      rules: {
        ...overrides,
      },
    },
  ];
}
