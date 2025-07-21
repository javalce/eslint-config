import { type Linter } from 'eslint';

import { HTML_FILES, TS_FILES } from '../constants';
import { type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function angular(): Promise<TypedConfigItem[]> {
  ensureInstalled('angular-eslint');

  const [angularPlugin, tseslint] = await Promise.all([
    lazy(import('angular-eslint')),
    lazy(import('typescript-eslint')),
  ]);

  return [
    {
      name: 'angular/setup',
      plugins: {
        '@angular-eslint': angularPlugin.tsPlugin,
        '@angular-eslint/template': angularPlugin.templatePlugin,
      },
    },
    {
      name: 'angular/typescript/rules',
      files: [TS_FILES],
      languageOptions: {
        parser: tseslint.parser as Linter.Parser,
        sourceType: 'module',
      },
      processor: angularPlugin.processInlineTemplates,
      rules: {
        ...angularPlugin.configs.tsRecommended
          .map((i) => i.rules)
          .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      },
    },
    {
      name: 'angular/template/rules',
      files: [HTML_FILES],
      languageOptions: {
        parser: angularPlugin.templateParser as Linter.Parser,
      },
      rules: {
        ...angularPlugin.configs.templateRecommended
          .map((i) => i.rules)
          .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
        ...angularPlugin.configs.templateAccessibility
          .map((i) => i.rules)
          .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      },
    },
  ];
}
