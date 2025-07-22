import { type Linter } from 'eslint';

import { HTML_FILES, TS_FILES } from '../constants';
import { type OptionsAngular, type TypedConfigItem } from '../types';
import { ensureInstalled, lazy } from '../utils';

export async function angular(options: OptionsAngular = {}): Promise<TypedConfigItem[]> {
  ensureInstalled('angular-eslint');

  const selector = options.selector ?? 'app';
  const directive: OptionsAngular['directive'] = {
    type: 'attribute',
    prefix: selector,
    style: 'camelCase',
    ...options.directive,
  };
  const component: OptionsAngular['component'] = {
    type: 'element',
    prefix: selector,
    style: 'kebab-case',
    ...options.component,
  };

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
        '@angular-eslint/directive-selector': ['error', directive],
        '@angular-eslint/component-selector': ['error', component],
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
