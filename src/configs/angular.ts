import { type Linter } from 'eslint';

import { GLOB_HTML_FILES, GLOB_TS_FILES } from '../globs';
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
  const overridesTypescript = options.overrides?.typescript;
  const overridesTemplate = options.overrides?.template;

  const [angularPlugin, tseslint] = await Promise.all([
    lazy(import('angular-eslint')),
    lazy(import('typescript-eslint')),
  ]);

  function createAngularConfig(name: string, rules: TypedConfigItem['rules']): TypedConfigItem {
    return {
      name,
      files: [GLOB_TS_FILES],
      languageOptions: {
        parser: tseslint.parser as Linter.Parser,
        sourceType: 'module',
      },
      processor: angularPlugin.processInlineTemplates,
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
        parser: angularPlugin.templateParser as Linter.Parser,
      },
      rules,
    };
  }

  return [
    {
      name: 'angular/setup',
      plugins: {
        '@angular-eslint': angularPlugin.tsPlugin,
        '@angular-eslint/template': angularPlugin.templatePlugin,
      },
    },
    createAngularConfig('angular/typescript/rules', {
      ...angularPlugin.configs.tsRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      '@angular-eslint/directive-selector': ['error', directive],
      '@angular-eslint/component-selector': ['error', component],
    }),
    createAngularConfig('angular/typescript/rules/overrides', { ...overridesTypescript }),
    createAngularTemplateConfig('angular/template/rules', {
      ...angularPlugin.configs.templateRecommended
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      ...angularPlugin.configs.templateAccessibility
        .map((i) => i.rules)
        .reduce((acc, rules) => ({ ...acc, ...rules }), {}),
      ...overridesTemplate,
    }),
    createAngularTemplateConfig('angular/template/rules/overrides', { ...overridesTemplate }),
  ];
}
