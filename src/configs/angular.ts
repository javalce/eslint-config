import type { Linter } from 'eslint';

import type { OptionsAngular, TypedConfigItem } from '../types';

import angularEslint from 'angular-eslint';
import { parser as tsParser } from 'typescript-eslint';

import { GLOB_HTML_FILES, GLOB_TS_FILES } from '../globs';

function createAngularConfig(name: string, rules: TypedConfigItem['rules']): TypedConfigItem {
  return {
    name,
    files: [GLOB_TS_FILES],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    processor: angularEslint.processInlineTemplates,
    rules,
  };
}

function createAngularTemplateConfig(
  name: string,
  rules: TypedConfigItem['rules'],
): TypedConfigItem {
  return {
    name,
    files: [GLOB_HTML_FILES],
    languageOptions: {
      parser: angularEslint.templateParser as Linter.Parser,
    },
    rules,
  };
}

export function angular(options: OptionsAngular = {}): TypedConfigItem[] {
  const directive: OptionsAngular['directive'] = {
    type: 'attribute',
    prefix: 'app',
    style: 'camelCase',
    ...options.directive,
  };
  const component: OptionsAngular['component'] = {
    type: 'element',
    prefix: 'app',
    style: 'kebab-case',
    ...options.component,
  };
  const overridesTypescript = options.overrides?.typescript;
  const overridesTemplate = options.overrides?.template;

  return [
    {
      name: 'angular/setup',
      plugins: {
        '@angular-eslint': angularEslint.tsPlugin,
        '@angular-eslint/template': angularEslint.templatePlugin,
      },
    },
    createAngularConfig('angular/typescript/rules', {
      ...angularEslint.configs.tsRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      '@angular-eslint/directive-selector': ['error', directive],
      '@angular-eslint/component-selector': ['error', component],
    }),
    createAngularConfig('angular/typescript/rules/overrides', { ...overridesTypescript }),
    createAngularTemplateConfig('angular/template/rules', {
      ...angularEslint.configs.templateRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      ...angularEslint.configs.templateAccessibility
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      ...overridesTemplate,
    }),
    createAngularTemplateConfig('angular/template/rules/overrides', { ...overridesTemplate }),
  ];
}
